import { userModel } from "../models/register.models.js";
import jwt from "jsonwebtoken";

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

    // Check if password matches (use bcrypt for hashed passwords)
    if (password === user.password) {
      const { email, name } = user;

      // Create the token on login
      const generate_token = jwt.sign({ email, name }, "adi", {
        expiresIn: "1h",
      });

      // Set the token as a cookie
      res.setHeader('Authorization', `Bearer ${generate_token}`)

      // Send response back to the client
      return res.json({
        message: "User logged in successfully",
        data: user,
        acces_token:generate_token
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
