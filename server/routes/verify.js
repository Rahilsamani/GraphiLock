import express from "express";
import { verifyController } from "../controllers/verify_token.js";

const router = express.Router();

router.get("/", verifyController);

export { router as VerifyRoute };
