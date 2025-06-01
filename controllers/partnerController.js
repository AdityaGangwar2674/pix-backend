const Partner = require("../models/Partner");

// Submit partner profile
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

// Get partner profile
exports.getPartnerProfile = async (req, res) => {
  try {
    const profile = await Partner.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add portfolio item
exports.addPortfolioItem = async (req, res) => {
  try {
    const { imageUrl, description, index } = req.body;
    const partner = await Partner.findOne({ userId: req.user._id });

    const newItem = {
      imageUrl,
      description,
      index: index ?? partner.portfolio.length,
    };

    partner.portfolio.push(newItem);
    await partner.save();

    res
      .status(201)
      .json({ message: "Portfolio item added", portfolio: partner.portfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update portfolio item
exports.updatePortfolioItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { imageUrl, description } = req.body;
    const partner = await Partner.findOne({ userId: req.user._id });

    const item = partner.portfolio.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (imageUrl) item.imageUrl = imageUrl;
    if (description) item.description = description;

    await partner.save();
    res.json({ message: "Item updated", portfolio: partner.portfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete portfolio item
exports.deletePortfolioItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const partner = await Partner.findOne({ userId: req.user._id });

    partner.portfolio = partner.portfolio.filter(
      (item) => item._id.toString() !== itemId
    );

    await partner.save();
    res.json({ message: "Item deleted", portfolio: partner.portfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reorder portfolio items
exports.reorderPortfolio = async (req, res) => {
  try {
    const { newOrder } = req.body; // [{ _id, index }]
    const partner = await Partner.findOne({ userId: req.user._id });

    newOrder.forEach(({ _id, index }) => {
      const item = partner.portfolio.id(_id);
      if (item) item.index = index;
    });

    partner.portfolio.sort((a, b) => a.index - b.index);
    await partner.save();

    res.json({ message: "Portfolio reordered", portfolio: partner.portfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
