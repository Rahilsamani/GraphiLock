import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const contactFormatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

contactFormatSchema.plugin(mongooseUniqueValidator);

const ContactFormat = mongoose.model("ContactFormat", contactFormatSchema);

export default ContactFormat;
