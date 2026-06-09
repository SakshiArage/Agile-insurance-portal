const mongoose = require("mongoose");

const kycRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    document_type: {
      type: String,
      enum: ["aadhaar", "pan", "passport", "driving_license"],
      required: true,
    },
    document_number: {
      type: String,
      required: true,
      trim: true,
    },
    document_image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    review_note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("KycRequest", kycRequestSchema);
