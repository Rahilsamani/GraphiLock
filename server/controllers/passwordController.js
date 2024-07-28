import crypto from "crypto";
import userModel from "../models/user.js";
import { encryptData } from "../encryption.js";
import { mailSender } from "../utils/nodemailer.js";

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

    mailSender(
      user.email,
      "Password Reset",
      `You requested a password reset. Use this token to reset your password: ${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password Link Send On Email Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending forget password link",
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
