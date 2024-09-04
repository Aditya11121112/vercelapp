import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { register } from "./controllers/register.controllers.js";
import { login } from "./controllers/login.controller.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "frontend-one-flax-26.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//apis for setup

//register route

app.get("/", (req, res) => {
  res.send("hellow");
});
app.post("/api/v1/register", register);
app.post("/api/v1/login", login);

await mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.vcbdv.mongodb.net/Vercel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((data) => {
    app.listen(4000, () => {
      console.log("server started ate port 4000 and databse coonected ");
    });
  })
  .catch((err) => {
    console.log("Error in connection databse", err.message);
  });
