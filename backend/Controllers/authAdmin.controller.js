const express = require("express");
const Admin = require("../Models/admin.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

const registerAdmin = catchAsync(async (req, res, next) => {
    try{
        const { fullname, email, phone, password } = req.body;
        const existing = await Admin.findOne({
            $or: [{ email }, { phone }],
        });

        if (existing) {
            return next(new AppError("Email or phone already exists", 409));
        }
        const admin = await Admin.create({
            name: fullname,
            email,
            phone,
            password,
        })
        res.status(201).json({
            success: true,
            message: "Admin registration successful",
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    phone: admin.phone,
                },
            },
        });
    }
    catch (error) {
        return next(new AppError("Internal server error", 500));
    }
});

const loginAdmin = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) { 
            return next( new AppError( "Email and password required", 400 ) ); 
        }
        const admin = await Admin.findOne({ email });
        if (!admin) { 
            return next( new AppError( "Invalid credentials", 401 ) ); 
        }
        const matched = await admin.comparePassword(password);
        if (!matched) { 
            return next( new AppError( "Invalid credentials", 401 ) ); 
        }
        const token = jwt.sign(
            {   id: admin._id, 
                name: admin.name, 
                email: admin.email,
            },
            process.env.JWT_SECRET, 
            { expiresIn: "1d" });
        res.status(200).json({
            success: true,
            message: "Admin login successful",
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    phone: admin.phone,
                },
                token,
            },
        });
    }
    catch (error) {
        return next(new AppError("Internal server error", 500));
    }
});
module.exports = { registerAdmin, loginAdmin };