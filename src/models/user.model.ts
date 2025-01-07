import { Schema, model } from "mongoose";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/constant";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      minLength: [2, "Username must be at least 3 character long"],
      maxLength: [30, "Username cannot exceed 30 characters"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return EMAIL_REGEX.test(value);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [100, "Password cannot exceed 100 characters"],
      validate: {
        validator: function (value: string) {
          return PASSWORD_REGEX.test(value);
        },
        message: "Password must contain 1 upper case,1 lower case, 1 number and 1 special character",
      },
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("users", userSchema);
export default User;
