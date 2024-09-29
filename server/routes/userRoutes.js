import express from "express";
import { auth, getAllUsers, getUser } from "../controllers/userController.js";

const app = express.Router();

app.post("/auth", auth);
app.get("/users", getAllUsers);
app.get("/user", getUser);

export default app;
