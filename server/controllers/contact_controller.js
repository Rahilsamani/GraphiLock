import contactFormatModel from "../models/contact_format.js";

const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(406).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const contactFormat = new contactFormatModel({ name, email, message });
    await contactFormat.save();
    return res
      .status(200)
      .json({ success: true, message: "Contact Message Saved Successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Sending Contact Message",
      error: err,
    });
  }
};

export { contactController };
