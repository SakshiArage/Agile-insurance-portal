const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
},
  companyName: {
    type: String,
    required: true
  },
  companyLogo: String,

    policy_name: {
      type: String,
      required: true,
      trim: true,
    },


     monthlyPremium: Number,

  coverageAmount: Number,

  claimRatio: Number,

  validityYears: Number,

  rating: Number,


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
    
    emiAvailable: {
    type: Boolean,
    default: false
  },

  policyType: String,

  features: [{
    type: String
  }],

  description: String,

  isActive: {
    type: Boolean,
    default: true
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
