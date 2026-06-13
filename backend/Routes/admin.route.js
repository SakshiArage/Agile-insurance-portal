const express = require("express");

const authenticateAdmin = require("../Middlewares/admin.middleware");

const {
  getDashboard,
  getUsers,
  getAgents,
  getPolicies,
  getClaims,
  getPayments,
  getKycRequests,
  getSystemSettings,
  updateSystemSettings,
  createAuditLog,
  getAuditLogs,
  reviewKyc,
} = require("../Controllers/admin.controller");

const router = express.Router();


router.post("/auth/register", registerAdmin);
router.post("/auth/login", loginAdmin);
router.get("/settings", getSystemSettings);
router.use(authenticateAdmin);
router.patch("/settings", updateSystemSettings);

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.get("/policies", getPolicies);
router.get("/claims", getClaims);
router.get("/agents", getAgents);
router.get("/payments", getPayments);
router.get("/kyc-requests", getKycRequests);
router.patch("/kyc-requests/:id", reviewKyc);
router.get("/audit-logs", getAuditLogs);
router.post("/audit-logs", createAuditLog);

module.exports = router;