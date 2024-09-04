import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const userModel = mongoose.model("users", userScehma);
