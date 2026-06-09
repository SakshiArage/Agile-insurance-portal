const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    policy_name: {
      type: String,
      required: true,
      trim: true,
    },
    policy_type: {
      type: String,
      required: true,
      trim: true,
    },


    policy_desc:{
      type: String,
      require:true,
    },
    claim:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Claim",
      required:false,
      index:true,
    },
    

    policy_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    premium_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    coverage_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "expired", "pending", "cancelled"],
      default: "pending",
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Policy", policySchema);
