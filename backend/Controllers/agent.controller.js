const User = require("../Models/userModel.model");
const Policy = require("../Models/policy.model");
const Claim = require("../Models/claim.model");
const Payment = require("../Models/payment.model");
const catchAsync = require("../Utils/catchAsync");

const getDashboard = catchAsync(async (req, res) => {
  const [assignedCustomers, claimsProcessing, policyManagement, revenueAgg] = await Promise.all([
    User.find({ role: "user" }).select("fullName email phone kyc_status created_at").sort({ created_at: -1 }).limit(10),
    Claim.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(10),
    Policy.find({ agent: req.user._id }).populate("user", "fullName email").sort({ createdAt: -1 }).limit(10),
    Payment.aggregate([
      { $match: { method: { $in: ["upi", "card", "netbanking", "wallet", "autopay"] }, status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      assignedCustomers,
      claimsProcessing,
      policyManagement,
      salesPerformance: {
        revenueGenerated: revenueAgg?.[0]?.total || 0,
      },
      customerSupport: [],
    },
  });
});

module.exports = {
  getDashboard,
};
