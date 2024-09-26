import mongoose from "mongoose";
const { Schema } = mongoose;
// import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [
      {
        message: {
          type: String,
        },
        sender: {
          type: String,
        },
        receiver: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    profile: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await hash(this.password, 8);
// });

const User = mongoose.model("User", userSchema);

export default User;
