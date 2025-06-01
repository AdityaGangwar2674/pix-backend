const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
