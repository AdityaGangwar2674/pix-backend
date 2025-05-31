const Inquiry = require("../models/Inquiry");
const Partner = require("../models/Partner");

// Client creates inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { category, date, budget, city, referenceImage } = req.body;

    const partners = await Partner.find({
      "serviceDetails.categories": category,
      "serviceDetails.city": city,
      status: "verified",
    });

    const partnerIds = partners.map((p) => p._id);

    const newInquiry = await Inquiry.create({
      clientId: req.user._id,
      category,
      date,
      budget,
      city,
      referenceImage,
      assignedPartners: partnerIds,
    });

    res.status(201).json({ message: "Inquiry submitted", inquiry: newInquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit inquiry" });
  }
};

// Partner gets assigned leads
exports.getAssignedLeads = async (req, res) => {
  try {
    const partnerId = req.user.partnerId; // set in authMiddleware

    const inquiries = await Inquiry.find({ assignedPartners: partnerId });

    res.status(200).json({ inquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assigned inquiries" });
  }
};
