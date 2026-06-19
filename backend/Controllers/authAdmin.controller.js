const express = require("express");
const Admin = require("../Models/admin.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

const registerAdmin = catchAsync(async (req, res, next) => {
    try{
        const { fullname, fullName, email, phone, password, role } = req.body;
        const resolvedFullName = fullName || fullname;
 
        const existing = await Admin.findOne({
            $or: [{ email }, { phone }],
        });
 
        if (existing) {
            return next(new AppError("Email or phone already exists", 409));
        }
 
        const admin = await Admin.create({
            fullName: resolvedFullName,
            email,
            phone,
            password,
            role: role || "Support Executive",
        });


        res.status(201).json({
            success: true,
            message: "Admin registration successful",
            data: {
                admin: {
                    id: admin._id,
                    fullName: admin.fullName,
                    email: admin.email,
                    phone: admin.phone,
                    role: admin.role,
                },
            },
        });
    }
    catch (error) {
        console.error(error);
        return next(new AppError(error.message, 500));
         // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return next(new AppError(messages.join(", "), 400));
    }
    return next(new AppError("Internal server error", 500));
  
}
});

const loginAdmin = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;
 
        if (!email || !password) {
            return next(new AppError("Email and password required", 400));
        }
 
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return next(new AppError("Invalid credentials", 401));
        }
 
        if (!admin.isActive) {
            return next(new AppError("Admin account is disabled", 403));
        }
 
        const matched = await admin.comparePassword(password);
        if (!matched) {
            return next(new AppError("Invalid credentials", 401));
        }
 
        admin.lastLoginAt = new Date();
        await admin.save({ validateBeforeSave: false });
 
        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
        );
 
        res.status(200).json({
            success: true,
            message: "Admin login successful",
            data: {
                admin: {
                    id: admin._id,
                    fullName: admin.fullName,
                    email: admin.email,
                    phone: admin.phone,
                    role: admin.role,
                    profilePhoto: admin.profilePhoto,
                },
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        return next(new AppError(error.message, 500));
}
});
 
module.exports = { registerAdmin, loginAdmin };
 