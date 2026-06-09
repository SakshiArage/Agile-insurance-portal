const User = require("../Models/userModel.model");
const { signToken } = require("../Utils/jwt");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

const buildAuthResponse = (user) => {
  const token = signToken({
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  return {
    token,
    user: user.toJSON ? user.toJSON() : user,
  };
};

const register = catchAsync(async (req, res, next) => {
  const {
    full_name,
    email,
    phone,
    password,
    dob,
    gender,
    address,
    profile_image,
    role,
  } = req.body;

  const existing = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existing) {
    return next(new AppError("Email or phone already exists", 409));
  }

  const user = await User.create({
    full_name,
    email,
    phone,
    password,
    dob,
    gender,
    address,
    profile_image,
    role: role || "user",
    is_verified: false,
    kyc_status: "pending",
  });

  const auth = buildAuthResponse(user);
  return res.status(201).json({
    success: true,
    message: "Registration successful",
    data: auth,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const matched = await user.comparePassword(password);
  if (!matched) {
    return next(new AppError("Invalid email or password", 401));
  }

  const auth = buildAuthResponse(user);
  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: auth,
  });
});

const logout = catchAsync(async (req, res) =>
  res.status(200).json({
    success: true,
    message: "Logout successful",
  }),
);

const me = catchAsync(async (req, res) =>
  res.status(200).json({
    success: true,
    data: req.user,
  }),
);

const updateProfile = catchAsync(async (req, res, next) => {
  const allowedFields = [
    "full_name",
    "email",
    "phone",
    "dob",
    "gender",
    "address",
    "profile_image",
    "kyc_status",
  ];

  const updateData = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  if (req.user.role === "user" && req.body.role && req.body.role !== req.user.role) {
    return next(new AppError("Forbidden", 403));
  }

  if (req.body.role && req.user.role === "admin") {
    updateData.role = req.body.role;
  }

  const duplicate = await User.findOne({
    _id: { $ne: req.user._id },
    $or: [
      ...(updateData.email ? [{ email: updateData.email }] : []),
      ...(updateData.phone ? [{ phone: updateData.phone }] : []),
    ],
  });

  if (duplicate) {
    return next(new AppError("Email or phone already exists", 409));
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { current_password, new_password } = req.body;

  const user = await User.findById(req.user._id);
  const matched = await user.comparePassword(current_password);
  if (!matched) {
    return next(new AppError("Current password is incorrect", 400));
  }

  user.password = new_password;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

module.exports = {
  register,
  login,
  logout,
  me,
  updateProfile,
  changePassword,
};
