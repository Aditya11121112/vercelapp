import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookies from "cookie-parser";
import { register } from "./controllers/register.controllers.js";
import { login } from "./controllers/login.controller.js";
import { logout } from "./controllers/logout.controller.js";
import { validate_token } from "./middleware/auth.middleware.js";

const app = express();
app.use(cookies());
app.use(express.json());
const local = "http://localhost:5173";

const production = "https://frontend-one-flax-26.vercel.app";
app.use(
  cors({
    origin: production,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//apis for setup

//register route

app.get("/", (req, res) => {
  res.send("hellow");
});
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/validate-token", validate_token);

await mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.vcbdv.mongodb.net/Vercel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((data) => {
    app.listen(3000, () => {
      console.log("server started ate port 3000 and databse coonected ");
    });
  })
  .catch((err) => {
    console.log("Error in connection databse", err.message);
  });
