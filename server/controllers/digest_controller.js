import digestModel from "../models/digest.js";

const digestController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(406).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const currentEmail = await digestModel.findOne({ email });

    if (currentEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed." });
    }

    const newEmail = new digestModel({ email });
    await newEmail.save();

    return res
      .status(200)
      .json({ success: true, message: "User Subsribed Successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Subscribing the User",
      error: err,
    });
  }
};

export { digestController };
