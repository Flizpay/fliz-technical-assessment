import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  house: { type: String, required: true },
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

export default model("User", UserSchema);
