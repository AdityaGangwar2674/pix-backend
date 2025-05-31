const Partner = require("../models/Partner");

exports.getPendingVerifications = async (req, res) => {
  try {
    const pending = await Partner.find({ status: "pending" }).populate(
      "userId",
      "email"
    );
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyPartner = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const { id } = req.params;

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const partner = await Partner.findById(id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    partner.status = status;
    partner.adminComment = comment;
    await partner.save();

    res.json({ message: "Partner updated", partner });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
