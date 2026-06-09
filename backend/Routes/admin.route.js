const express = require("express");
const authenticateUser = require("../Middlewares/auth.middleware");
const authorizeRoles = require("../Middlewares/role.middleware");
const {
  getDashboard,
  getUsers,
  getAgents,
  getPolicies,
  getClaims,
  getPayments,
  getKycRequests,
  reviewKyc,
} = require("../Controllers/admin.controller");

const router = express.Router();

router.use(authenticateUser, authorizeRoles("admin"));

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.get("/agents", getAgents);
router.get("/policies", getPolicies);
router.get("/claims", getClaims);
router.get("/payments", getPayments);
router.get("/kyc-requests", getKycRequests);
router.patch("/kyc-requests/:id", reviewKyc);

module.exports = router;
