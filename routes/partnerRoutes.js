const express = require("express");
const router = express.Router();
const {
  submitPartnerProfile,
  getPartnerProfile,
} = require("../controllers/partnerController");
const {
  roleMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

router.post(
  "/onboard",
  authMiddleware,
  roleMiddleware("partner"),
  submitPartnerProfile
);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("partner"),
  getPartnerProfile
);

module.exports = router;
