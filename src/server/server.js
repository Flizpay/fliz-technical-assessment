import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import RegisterModel from "./models/Register.js";
import AdventureModel from "./models/adventure.js";
import { OAuth2Client } from "google-auth-library";

import fs from "fs";
import path from "path";

dotenv.config();

const JWT_SECRET = "afnowieuojnvaoiniofojwe0e";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Read JSON files
const easyAdventures = JSON.parse(
  fs.readFileSync(path.resolve("src/config/levels/easy.json"), "utf-8")
);
const mediumAdventures = JSON.parse(
  fs.readFileSync(path.resolve("src/config/levels/medium.json"), "utf-8")
);
const hardAdventures = JSON.parse(
  fs.readFileSync(path.resolve("src/config/levels/hard.json"), "utf-8")
);

// Initialize a new game for a user
app.post("/api/initialize-game", async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch the user
    const user = await RegisterModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize resources and skills
    user.resources = {
      coins: 100,
      peasants: 20,
      scrolls: 10,
    };
    user.skills = {
      fear: 0,
      magic: 0,
      trading: 0,
      wisdom: 0,
    };

    // Generate the first set of 20 adventures
    const adventures = [
      ...easyAdventures.slice(0, 5),
      ...mediumAdventures.slice(0, 10),
      ...hardAdventures.slice(0, 5),
    ];

    // Save the adventures to the user's profile
    user.adventures = adventures;

    // Save the updated user
    await user.save();

    res.json({ message: "Game initialized successfully", user });
  } catch (error) {
    console.error("Error initializing game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Function to update User collection after registration
const updateUserCollection = async (userData) => {
  try {
    const { house, nickname, name, email, password } = userData;

    // Check if user already exists in User collection
    let user = await RegisterModel.findOne({ email });
    if (!user) {
      // Create a new user if not exists
      user = new RegisterModel({
        house,
        nickname,
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        resources: {
          coins: 100,
          peasants: 20,
          scrolls: 10,
        },
        skills: {
          fear: 0,
          magic: 0,
          trading: 0,
          wisdom: 0,
        },
      });
    } else {
      // Update existing user
      user.house = house;
      user.nickname = nickname;
      user.name = name;
      user.password = bcrypt.hashSync(password, 10);
    }

    // Save the user
    await user.save();
    return user;
  } catch (error) {
    console.error("Error updating User collection:", error);
    throw new Error("Server error");
  }
};

app.post("/api/register", async (req, res) => {
  const { house, nickname, name, email, password } = req.body;
  try {
    const user = await RegisterModel.create({
      house,
      nickname,
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    // Update User collection
    await updateUserCollection(user);

    res.json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/register", (req, res) => {
  RegisterModel.find({})
    .then(function (register) {
      res.json(register);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await RegisterModel.findOne({ email });
  if (user) {
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (passwordMatch) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "None", secure: true }) // ensure secure option is set
            .json({ success: true, message: "Password matches!" });
        }
      );
    } else {
      res.json({ message: "Password does not match" });
    }
  } else {
    res.json({ success: false });
  }
});

app.get("/api/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const user = await RegisterModel.findById(userData.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});

app.get("/api/user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await RegisterModel.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await RegisterModel.findOne({ googleId });
    if (!user) {
      user = await RegisterModel.create({
        email,
        username: name,
        googleId,
        nickname: name,
        house: "defaultHouse", // or any default value
      });
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      JWT_SECRET,
      {}
    );

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/adventures", async (req, res) => {
  try {
    const adventures = await AdventureModel.aggregate([
      { $sample: { size: 25 } }, // Fetch 25 random adventures
    ]);
    res.json(adventures);
  } catch (error) {
    console.error("Error fetching adventures:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
