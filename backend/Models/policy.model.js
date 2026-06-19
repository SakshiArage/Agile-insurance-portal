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
    required: [true, 'Company name is required'],
    trim: true,
  },
  companyLogo: {
      type: String, // URL to logo image
      default: '',
    },
    policyName: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true,
    },


     monthlyPremium: Number,


  validityYears: {
      type: Number,
      default: 1,
      min: 1,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    claimRatio: {
      type: Number,
      default: 95,
      min: 0,
      max: 100,
      // percentage, e.g. 98.5 means 98.5%
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
    
    emiAvailable: {
    type: Boolean,
    default: false
  },

  policyType: {
      type: String,
      required: [true, 'Policy type is required'],
      trim: true,
      // e.g. "Comprehensive", "Term", "Floater"
    },

  features: {
      type: [String],
      default: [],
    },

  description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
  category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['health', 'auto', 'term', 'life', 'travel', 'business'],
      lowercase: true,
    },
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

// Auto-generate policy_number before first save
policySchema.pre('save', function () {
  if (!this.policy_number) {
    const rand1 = Math.floor(100000 + Math.random() * 900000);
    const rand2 = Math.floor(1000 + Math.random() * 9000);
    this.policy_number = `AGL-${rand1}-${rand2}`;
  }
});

// Full-text search index on these fields
policySchema.index({ policyName: 'text', companyName: 'text', description: 'text' });

module.exports = mongoose.model('Policy', policySchema);