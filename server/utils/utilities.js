import fetch from "node-fetch";
import { createApi } from "unsplash-js";
import userAttemptsModel from "../models/user_attempts.js";
import { transporter } from "./nodemailer.js";
import dotenv from "dotenv";

dotenv.config();

function checkArray(arr1, arr2, sequence) {
  if (arr1.length !== arr2.length) return false;

  if (sequence) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  return arr1.every((value) => arr2.includes(value));
}

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_SECRET_KEY,
  fetch: fetch,
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function sendEmail(email) {
  try {
    const currentUser = await userAttemptsModel.findOne({ email });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "GraphiLock | Account Blocked",
      html: `
        <div>
          <p>Your account has been blocked for multiple attempts of login with invalid credentials.</p>
          <p>Click the link below to unblock:</p>
          <a href='http://localhost:3000/api/verify?email=${email}&token=${currentUser.token}'>Unblock</a>
        </div>`,
    };
    console.log("Sending email to " + email);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
}

export { checkArray, unsplash, shuffleArray, sendEmail };
