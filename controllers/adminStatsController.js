const User = require("../models/User");
const Partner = require("../models/Partner");
const Inquiry = require("../models/Inquiry");
const Review = require("../models/Review");
const Category = require("../models/Category");
const Location = require("../models/Location");

exports.getKPIs = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: "client" });
    const totalPartners = await User.countDocuments({ role: "partner" });
    const pendingVerifications = await Partner.countDocuments({
      status: "pending",
    });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      totalClients,
      totalPartners,
      pendingVerifications,
      totalInquiries,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reviews
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate("reviewerId", "email");
  res.json(reviews);
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findByIdAndUpdate(
    id,
    { rating, comment },
    { new: true }
  );
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

// Categories
exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};

// Locations
exports.createLocation = async (req, res) => {
  const location = new Location(req.body);
  await location.save();
  res.status(201).json(location);
};

exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

exports.updateLocation = async (req, res) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(location);
};

exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};

// Promote Partner
exports.promotePartner = async (req, res) => {
  const { id } = req.params;
  const partner = await Partner.findByIdAndUpdate(
    id,
    { isFeatured: true },
    { new: true }
  );
  res.json({ message: "Partner promoted", partner });
};
