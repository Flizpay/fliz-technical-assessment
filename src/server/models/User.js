import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  house: { type: String, required: true },
  nickname: { type: String, unique: true, required: true },
  googleId: { type: String, unique: true, sparse: true },
  adventures: { type: Array, default: [] },
  resources: {
    coins: { type: Number, default: 100 },
    peasants: { type: Number, default: 10 },
    scrolls: { type: Number, default: 5 },
  },
  skills: {
    fear: { type: Number, default: 1 },
    magic: { type: Number, default: 1 },
    trading: { type: Number, default: 1 },
    wisdom: { type: Number, default: 1 },
  },
});

UserSchema.pre("save", async function (next) {
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

const UserModel = model("User", UserSchema);
export default UserModel;
