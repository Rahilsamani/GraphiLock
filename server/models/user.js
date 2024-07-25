import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    pattern: {
      type: [String],
      required: [true, "Pattern is required"],
    },
    sequence: {
      type: Boolean,
      required: [true, "Sequence is required"],
    },
    sets: {
      type: [[Object]],
      required: [true, "Sets are required"],
    },
    resetToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
