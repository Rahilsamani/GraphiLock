import express from "express";
import { getByUser } from "../controllers/image.js";
import { search as imageSearch } from "../controllers/image_search.js";

const router = express.Router();

router.get("/search", imageSearch);
router.get("/", getByUser);

export { router };
