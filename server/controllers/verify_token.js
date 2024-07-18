import { userModel } from "../models/user.js";
import { userAttemptsModel } from "../models/user_attempts.js";
import { commons, validation_messages as msg } from "../static/message.js";
import path from "path";

const verify = async (req, res) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    const currentUser = await userAttemptsModel.findOne({ email });

    if (!currentUser || currentUser.token !== token) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or account is not blocked.",
      });
    }

    await userAttemptsModel.findOneAndUpdate(
      { email },
      { attempts: 0, token: "" }
    );

    res.sendFile(path.resolve("views/unblocked.html"));
  } catch (err) {
    res.status(500).json({ message: msg.search_err });
  }
};

export { verify as verifyController };
