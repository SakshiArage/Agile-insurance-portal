const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },
    claim_number: {
      type: String,
      required: true,
      unique: true,
    },
    claim_type: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "rejected"],
      default: "pending",
    },
    ai_status: {
      type: String,
      enum: ["pending", "verified", "flagged"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Claim", claimSchema);
