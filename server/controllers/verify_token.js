import userModel from "../models/user.js";
import userAttemptsModel from "../models/user_attempts.js";
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

    return res.sendFile(path.resolve("views/unblocked.html"));
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Verifying The User",
    });
  }
};

export { verify as verifyController };
