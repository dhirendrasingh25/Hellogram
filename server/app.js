import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/features.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 1000;

app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
