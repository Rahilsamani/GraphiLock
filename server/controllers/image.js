import { userModel as User } from "../models/user.js";

const getByUser = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }

  try {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user: existingUser.sets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching User Details",
      error: err,
    });
  }
};

export { getByUser };
