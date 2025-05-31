const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    referenceImage: {
      type: String, // URL (optional)
    },
    assignedPartners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner",
      },
    ],
    status: {
      type: String,
      enum: ["new", "responded", "booked", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
