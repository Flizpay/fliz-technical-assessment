import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  house: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resources: {
    coins: { type: Number, default: 100 },
    peasants: { type: Number, default: 20 },
    scrolls: { type: Number, default: 10 },
  },
  skills: {
    fear: { type: Number, default: 1 },
    magic: { type: Number, default: 1 },
    trading: { type: Number, default: 1 },
    wisdom: { type: Number, default: 1 },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  adventures: { type: Array, default: [] },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("nickname")) {
    const existingUser = await model("User").findOne({
      nickname: user.nickname,
    });
    if (existingUser) {
      throw new Error("Nickname already in use");
    }
  }
  if (user.isModified("email")) {
    const existingUser = await model("User").findOne({ email: user.email });
    if (existingUser) {
      throw new Error("Email already in use");
    }
  }
  next();
});

const RegisterModel = mongoose.model("registerforms", userSchema);

export default RegisterModel;
