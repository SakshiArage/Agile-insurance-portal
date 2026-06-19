const express = require("express");
const authenticateUser = require("../Middlewares/auth.middleware");
const authorizeRoles = require("../Middlewares/role.middleware");
const { createKycRequest, getMyKycRequests } = require("../Controllers/kyc.controller");
const { validateKycRequest } = require("../Middlewares/validation.middleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("user", "admin"), validateKycRequest, createKycRequest);
router.get("/me", authenticateUser, getMyKycRequests);

module.exports = router;
