import { userModel } from "../models/register.models.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  await userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "user not found please register",
          data: "",
        });
      }

      if (password == user.password) {
        return res.json({ message: "user login succesfuuly", data: user });
      }

      return res.json({ message: "Password incorrect", data: "" });
    })
    .catch((error) => {
      res.json({ message: "error in login api", data: error.message });
    });
};

export { login };
