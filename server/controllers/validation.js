import { userModel as User } from "../models/user.js";

const check = async (req, res) => {
  const { username, email } = req.query;

  if (!username && !email) {
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
  }

  try {
    const query = username ? { username: username.toLowerCase() } : { email };
    const user = await User.findOne(query);

    return res.status(200).json({
      success: true,
      message: "User Checked Successfully",
      exists: !!user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Somwthing Went Wrong While Checking User",
    });
  }
};

export { check as checkController };
