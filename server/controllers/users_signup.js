import dotenv from "dotenv";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import userAttemptsModel from "../models/user_attempts.js";
import { encryptData } from "../encryption.js";

dotenv.config();

const signupController = async (req, res) => {
  try {
    const { username, email, phoneNumber, password, category, pattern, sets } =
      req.body;

    if (
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      !category ||
      !pattern ||
      !sets
    ) {
      return res.status(406).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    if (pattern.length !== 3) {
      return res.status(406).json({
        success: false,
        message: "Pattern must consist of 3 images",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+91")
      ? phoneNumber
      : `+91${phoneNumber}`;
    const encryptedPassword = encryptData(password);

    const createdUser = new userModel({
      username: username.toLowerCase(),
      email,
      phoneNumber: formattedPhoneNumber,
      password: encryptedPassword,
      category,
      sets,
      pattern,
      sequence: false,
    });

    await createdUser.save();

    const attempts = new userAttemptsModel({
      username: createdUser.username,
      email: createdUser.email,
      attempts: 0,
    });

    await attempts.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      username: createdUser.username,
      userId: createdUser.id,
      email: createdUser.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Signing Up User",
      error: error.message,
    });
  }
};

export { signupController };
