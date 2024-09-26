import express from "express";
import { auth } from "../controllers/userController.js";

const app = express.Router();

app.post("/auth", auth);

export default app;
