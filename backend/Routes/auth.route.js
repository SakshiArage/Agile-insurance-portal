const express = require("express");
const {
  register,
  login,
  logout,
  me,
  updateProfile,
  changePassword,
} = require("../Controllers/auth.controller");
const authenticateUser = require("../Middlewares/auth.middleware");
const { validateRegister, validateLogin, validateUpdateProfile, validateChangePassword } = require("../Middlewares/validation.middleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, me);
router.put("/update-profile", authenticateUser, validateUpdateProfile, updateProfile);
router.put("/change-password", authenticateUser, validateChangePassword, changePassword);

module.exports = router;
