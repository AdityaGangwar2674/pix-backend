const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getAssignedLeads,
} = require("../controllers/inquiryController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, roleMiddleware("client"), createInquiry);

router.get(
  "/partner/leads",
  authMiddleware,
  roleMiddleware("partner"),
  getAssignedLeads
);

module.exports = router;
