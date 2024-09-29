import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./utils/features.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";

const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 1000;

app.use("/api/v1", userRoutes);

io.on("connection", (socket) => {
  console.log("user connected :", socket.id);
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, mySelf) => {
    const user = await User.find({ email: to });
    const decoded = jwt.verify(mySelf, process.env.JWT_SECRET);
    const sender = await User.findById(decoded);
    io.sockets.emit("refresh", "new Message");
    if (user) {
      user[0].messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      sender?.messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      await user[0].save();
      await sender?.save();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
