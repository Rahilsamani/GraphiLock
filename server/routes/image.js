import express from "express";
import { search, getByUser } from "../controllers/imageController.js";

const router = express.Router();

router.get("/search", search);
router.get("/", getByUser);

export { router };
