import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, message) => {
  try {
    const info = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent:", info.sid);
    return info;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
};
