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
});

const RegisterModel = mongoose.model("registerforms", userSchema);

export default RegisterModel;
