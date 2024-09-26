import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/features.js";

export const auth = TryCatch(async (req, res, next) => {
  const { email, name, profile } = req.body;
  const user = await User.create({
    email,
    name,
    profile,
  });
  sendToken(res, user, 201, "User created successfully");
});
