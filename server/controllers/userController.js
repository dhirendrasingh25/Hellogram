import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/features.js";

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

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

export const getProfile = TryCatch(async (req, res, next) => {
  // console.log(req.params.id);
  const user = await User.findById(req.params.id);
  // console.log(user);
  if (!user) return next(new ErrorHandler("User not found", 404));
  sendToken(res, user, 200, `Welcome , ${user.name}`);
});

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new ErrorHandler("No Users Found", 404));
  res.status(200).json({
    success: true,
    users,
  });
});
