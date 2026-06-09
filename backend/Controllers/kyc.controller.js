const KycRequest = require("../Models/kycRequest.model");
const User = require("../Models/userModel.model");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

const createKycRequest = catchAsync(async (req, res, next) => {
  const { document_type, document_number, document_image } = req.body;
  const userId = req.user?._id || req.body.user;

  if (!userId) {
    return next(new AppError("User is required", 400));
  }

  const requestDoc = await KycRequest.create({
    user: userId,
    document_type,
    document_number,
    document_image,
  });

  await User.findByIdAndUpdate(userId, { kyc_status: "pending" });

  res.status(201).json({
    success: true,
    message: "KYC request created",
    data: requestDoc,
  });
});

const getMyKycRequests = catchAsync(async (req, res) => {
  const requests = await KycRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: requests });
});

module.exports = {
  createKycRequest,
  getMyKycRequests,
};
