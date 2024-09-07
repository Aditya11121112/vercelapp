import { userModel } from "../models/register.models.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  await userModel
    .findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.json({
          message: "user not found please register",
          data: "",
        });
      }
      const { email, name } = user;

      if (password == user.password) {
        //create the token on login
         const access_token = await jwt.sign({ email, name }, "adi", {
          expiresIn: "1h",
        });
        const access_token = await res.cookie('access_token', access_token, {
    httpOnly: true, // Ensures the cookie is sent only in HTTP(S) requests and not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
    sameSite: 'Strict', // Prevents CSRF attacks by ensuring the cookie is only sent in requests originating from your site
    maxAge: 60 * 60 * 1000, // Sets the cookie expiration time (in milliseconds)
  });
       // await res.cookie("access_token", access_token);
        return res.json({
          message: "user login succesfuuly",
          data: user,
          access_Token: access_token,
        });
      }

      return res.json({ message: "Password incorrect", data: "" });
    })
    .catch((error) => {
      res.json({ message: "error in login api", data: error.message });
    });
};

export { login };
