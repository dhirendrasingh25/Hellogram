import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const auth = TryCatch(async (req, res, next) => {
  const { email, name, profile } = req.body;
  // console.log(req.body);
  const userF = await User.findOne({ email });
  if (userF) {
    sendToken(res, userF, 201, "User LoggedIn successfully");
  } else {
    const user = await User.create({
      email,
      name,
      profile,
    });
    sendToken(res, user, 201, "User SignUp successfully");
  }
});

export const getUser = TryCatch(async (req, res, next) => {
  const token = req.cookies["user"];
  if (!token) {
    return next(new ErrorHandler("JWT token not found", 401));
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData._id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    sendToken(res, user, 200, `Welcome, ${user.name}`);
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new ErrorHandler("No Users Found", 404));
  res.status(200).json({
    success: true,
    users,
  });
});
