import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
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

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
