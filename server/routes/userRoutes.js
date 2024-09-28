import express from "express";
import { auth, getAllUsers } from "../controllers/userController.js";

const app = express.Router();

app.post("/auth", auth);
app.get("/users", getAllUsers);

export default app;
