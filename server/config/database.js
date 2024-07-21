import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.error("DB Connection Failed", error);
      process.exit(1);
    });
};

export default { connect };
