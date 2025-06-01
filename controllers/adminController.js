const User = require("../models/User");
const Partner = require("../models/Partner");
const Inquiry = require("../models/Inquiry");

// Get pending partner verifications
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

// Verify or reject a partner
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

    res.json({ message: `Partner ${status}`, partner });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Platform-wide statistics
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPartners = await Partner.countDocuments();
    const verifiedPartners = await Partner.countDocuments({
      status: "verified",
    });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      totalUsers,
      totalPartners,
      verifiedPartners,
      totalInquiries,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// All inquiries (with user info)
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate(
      "userId",
      "email name role"
    );
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
