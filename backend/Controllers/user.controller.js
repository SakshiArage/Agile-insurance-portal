const Policy = require("../Models/policy.model");
const Claim = require("../Models/claim.model");
const Payment = require("../Models/payment.model");
const KycRequest = require("../Models/kycRequest.model");
const catchAsync = require("../Utils/catchAsync");
const userModel = require("../Models/userModel.model");
const SupportTicket = require("../Models/contact.model");

const getDashboard = catchAsync(async (req, res) => {
  const [activePolicies, upcomingPremiums, claimStatus, paymentHistory, kycRequests, userModel, supportTickets] = 
  await Promise.all([
    Policy.find({ user: req.user._id, status: "active" }).sort({ createdAt: -1 }).limit(6),
    Payment.find({ user: req.user._id, status: "pending" }).sort({ createdAt: -1 }).limit(6),
    Claim.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(6),
    Payment.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(6),
    KycRequest.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(6),
    userModel.findById(req.user._id).select("-password"),
    SupportTicket.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(6),

  ]);

  const profileFields = ["full_name", "email", "phone", "dob", "gender", "address", "profile_image", "role", "kyc_status"];
  
  
  
  const filledFields = profileFields.filter((field) => {
    if (field === "profile_image") return Boolean(req.user.profile_image);
    if (field === "dob") return Boolean(req.user.dob);
    return Boolean(req.user[field]);
  });

  res.status(200).json({
    success: true,
    data: {
      welcome: `Welcome back, ${req.user.full_name}`,
      activePolicies,
      upcomingPremiums,
      claimStatus,
      paymentHistory,
      kycStatus: req.user.kyc_status,
      supportTickets,
      profileCompletion: Math.round((filledFields.length / profileFields.length) * 100),
      kycRequests,
      user: userModel,
    },
  });
});

module.exports = {
  getDashboard,
};
