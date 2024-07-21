import express from "express";
import { search, getUsersImageSet } from "../controllers/imageController.js";

const router = express.Router();

router.get("/search", search);
router.get("/", getUsersImageSet);

export { router };
