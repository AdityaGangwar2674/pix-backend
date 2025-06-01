const express = require("express");
const router = express.Router();
const {
  submitPartnerProfile,
  getPartnerProfile,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  reorderPortfolio,
} = require("../controllers/partnerController");
const {
  roleMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

// Profile
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

// Portfolio
router.post(
  "/portfolio",
  authMiddleware,
  roleMiddleware("partner"),
  addPortfolioItem
);
router.put(
  "/portfolio/:itemId",
  authMiddleware,
  roleMiddleware("partner"),
  updatePortfolioItem
);
router.delete(
  "/portfolio/:itemId",
  authMiddleware,
  roleMiddleware("partner"),
  deletePortfolioItem
);
router.put(
  "/portfolio-reorder",
  authMiddleware,
  roleMiddleware("partner"),
  reorderPortfolio
);

module.exports = router;
