import crypto from "crypto";
import nodemailer from "nodemailer";
import { userModel } from "../models/user.js";
import { encryptData } from "../encryption.js";

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `GraphiLock <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Password Reset",
      text: `You requested a password reset. Use this token to reset your password: ${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ success: false, message: "Error sending email" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};

const resetPasswordController = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Reset token and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ resetToken });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid reset token" });
    }

    const encryptedPassword = encryptData(String(newPassword));
    user.password = encryptedPassword;
    user.resetToken = undefined;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Something went wrong while resetting password",
    });
  }
};

export { forgotPasswordController, resetPasswordController };
