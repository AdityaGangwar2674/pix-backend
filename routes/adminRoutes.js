const express = require("express");
const router = express.Router();
const {
  getPendingVerifications,
  verifyPartner,
  getAdminStats,
  getAllInquiries,
} = require("../controllers/adminController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/authMiddleware");

router.get(
  "/verifications",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingVerifications
);

router.put(
  "/verify/:id",
  authMiddleware,
  roleMiddleware("admin"),
  verifyPartner
);

router.get("/stats", authMiddleware, roleMiddleware("admin"), getAdminStats);

router.get(
  "/inquiries",
  authMiddleware,
  roleMiddleware("admin"),
  getAllInquiries
);

module.exports = router;
