import express from "express";
import { loginController } from "../controllers/users_login.js";
import { signupController } from "../controllers/users_signup.js";
import { checkController } from "../controllers/validation.js";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/passwordController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/check", checkController);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export { router };
