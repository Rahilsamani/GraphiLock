import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const digestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

digestSchema.plugin(mongooseUniqueValidator);

const Digest = mongoose.model("Digest", digestSchema);

export default Digest;
