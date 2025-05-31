const Partner = require("../models/Partner");

exports.submitPartnerProfile = async (req, res) => {
  try {
    const { personalDetails, serviceDetails, documents } = req.body;
    const userId = req.user._id;

    const existing = await Partner.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Profile already submitted" });
    }

    const partner = new Partner({
      userId,
      personalDetails,
      serviceDetails,
      documents,
    });

    await partner.save();
    res
      .status(201)
      .json({ message: "Profile submitted for verification", partner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPartnerProfile = async (req, res) => {
  try {
    const profile = await Partner.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
