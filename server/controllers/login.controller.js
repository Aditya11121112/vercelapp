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
        await res.cookie("access_token", access_token);
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
