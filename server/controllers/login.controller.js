import { userModel } from "../models/register.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Make sure to install this package

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.json({
        message: "User not found, please register",
        data: "",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password); // Assuming passwords are hashed
    if (isMatch) {
      const { email, name } = user;

      // Create the token on login
      const generate_token = jwt.sign({ email, name }, "adi", {
        expiresIn: "1h",
      });

      // Set the token as a cookie
      res.cookie('access_token', generate_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 3600000, // 1 hour
      });

      // Send response back to the client
      return res.json({
        message: "User logged in successfully",
        data: user,
        access_token: generate_token
      });
    }

    // Incorrect password
    return res.json({ message: "Password incorrect", data: "" });

  } catch (error) {
    // Catch and respond with any errors
    res.json({ message: "Error in login API", data: error.message });
  }
};

export { login };
