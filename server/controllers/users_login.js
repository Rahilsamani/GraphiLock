import * as dotenv from "dotenv";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import { checkArray } from "../utils/utilities.js";
import userAttemptsModel from "../models/user_attempts.js";
import { decryptData } from "../encryption.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `GraphiLock <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

const sendSMS = async (to, message) => {
  try {
    const info = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent:", info.sid);
    return info;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw error;
  }
};

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
      console.log("Invalid pattern length:", pattern.length);
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

    const MAX_ATTEMPTS = 3;

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
        const emailContent = `Dear ${existingUser.username}, your account has been blocked due to multiple failed login attempts. Please contact support for assistance.`;
        await sendEmail(
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
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { loginController, sendEmail, sendSMS };
