import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userAttemptsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    attempts: {
      type: Number,
      required: [true, "Attempts are required"],
      min: [0, "Attempts cannot be negative"],
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userAttemptsSchema.plugin(mongooseUniqueValidator);

const UserAttempts = mongoose.model("UserAttempts", userAttemptsSchema);

export default UserAttempts;
