const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    personalDetails: {
      name: String,
      phone: String,
      email: String,
    },
    serviceDetails: {
      categories: [String], // e.g., ["wedding", "maternity"]
      city: String,
      pricing: String,
    },
    documents: {
      aadharNumber: String,
    },
    portfolio: [
      {
        imageUrl: String,
        description: String,
        index: Number,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    adminComment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
