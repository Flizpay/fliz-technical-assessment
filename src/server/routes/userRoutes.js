import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("User routes are operational.");
});

export default router;

// import { Router } from "express";
// import { hash, compare } from "bcryptjs";
// import { sign } from "jsonwebtoken";
// import User from "../models/User";
// const router = Router();

// // Sign-Up
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password, house } = req.body;
//     const hashedPassword = await hash(password, 10);
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       house,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const isMatch = await compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     const token = sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
