import dotenv from "dotenv";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import { checkArray } from "../utils/utilities.js";
import userAttemptsModel from "../models/user_attempts.js";
import { decryptData } from "../encryption.js";
import { sendSMS } from "../utils/twilioSender.js";
import { mailSender } from "../utils/nodemailer.js";

dotenv.config();

const loginController = async (req, res) => {
  try {
    const { username, password, pattern, category } = req.body;
    const lowerCaseUsername = username?.toLowerCase();

    if (!lowerCaseUsername || !password || !pattern || !category) {
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

    const existingUser = await userModel.findOne({
      username: lowerCaseUsername,
    });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (existingUser.category !== category.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Category didn't match",
      });
    }

    const currentAttempts = await userAttemptsModel.findOne({
      username: lowerCaseUsername,
    });

    const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS;

    const storedPassword = decryptData(String(existingUser.password));
    const isValidPassword = password === storedPassword;
    const isValidPattern = checkArray(existingUser.pattern, pattern, true);

    if (isValidPassword && isValidPattern) {
      await userAttemptsModel.findOneAndUpdate(
        { username: lowerCaseUsername },
        { attempts: 0, emailSent: false },
        { upsert: true }
      );

      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "User Logged In Successfully",
        username: existingUser.username,
        userId: existingUser.id,
        email: existingUser.email,
        category: existingUser.category,
        token,
      });
    } else {
      const attempts = currentAttempts ? currentAttempts.attempts + 1 : 1;

      await userAttemptsModel.findOneAndUpdate(
        { username: lowerCaseUsername },
        { attempts, emailSent: attempts >= MAX_ATTEMPTS },
        { upsert: true }
      );

      if (attempts >= MAX_ATTEMPTS) {
        const emailContent = `Dear ${existingUser.username}, your account has been blocked due to multiple failed login attempts. Please Check Your Email Or SMS For The Account Recovery`;

        await mailSender(
          existingUser.email,
          "Login Attempt Exceeded",
          emailContent
        );

        if (existingUser.phoneNumber) {
          try {
            await sendSMS(existingUser.phoneNumber, emailContent);
          } catch (smsError) {
            console.error("Error sending SMS:", smsError.message);
          }
        }

        return res.status(403).json({
          status: "blocked",
          message: "Your account has been blocked, please check email.",
        });
      }

      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Logging The User",
    });
  }
};

export { loginController };
