import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Routes
app.use("/api/users", userRoutes);
// Config
config();
const PORT = process.env.PORT || 5000;
// const PORT = 5000;

// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
// connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// Routes

app.get("/", (req, res) => res.send("Game of Empires API is running"));

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
