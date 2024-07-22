import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { VerifyRoute } from "./routes/verify.js";
import { DigestRoutes } from "./routes/digest.js";
import { router as contactRoutes } from "./routes/contact.js";
import { router as imageRoutes } from "./routes/image.js";
import { router as userRoutes } from "./routes/users.js";
import { verifyController } from "./controllers/verify_token.js";
import database from "./config/database.js";

dotenv.config();

const app = express();

database.connect();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/verify", VerifyRoute);
app.use("/api/user/", userRoutes);
app.use("/api/image/", imageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/digest", DigestRoutes);
app.get("/api/verify", verifyController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
