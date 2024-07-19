import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import fs from "fs/promises";
import bodyParser from "body-parser";

import { VerifyRoute } from "./routes/verify.js";
import { DigestRoutes } from "./routes/digest.js";
import { router as contactRoutes } from "./routes/contact.js";
import { router as imageRoutes } from "./routes/image.js";
import { router as userRoutes } from "./routes/users.js";
import { verify } from "./controllers/verify_token.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const swaggerDocument = JSON.parse(
  await fs.readFile(new URL("./swagger.json", import.meta.url))
);

app.use("/api/verify", VerifyRoute);
app.use("/api/user/", userRoutes);
app.use("/api/image/", imageRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/contact", contactRoutes);
app.use("/api/digest", DigestRoutes);
app.get("/api/verify", verify);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB Connection Failed", error);
    process.exit(1);
  });
