import express from "express";
import { userModel } from "../models/register.models.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  await userModel
    .findOne({ email })
    .then(async (user) => {
      if (user) {
        return res.json({
          message: "user already  exist please login ",
          data: "",
        });
      }

      const user_data = await userModel.create({
        name,
        email,
        password,
      });

      return res.json({ message: "user created succesfully", data: user_data });
    })
    .catch((err) => {
      res.json({
        message: "There is some error in register api",
        Error: err.message,
      });
    });
};

export { register };
