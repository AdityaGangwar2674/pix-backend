const express = require("express");
const router = express.Router();
const {
  getKPIs,
  getAllReviews,
  updateReview,
  deleteReview,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
  promotePartner,
} = require("../controllers/adminStatsController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/authMiddleware");

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/kpis", getKPIs);

// Reviews
router.get("/reviews", getAllReviews);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

// Categories
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Locations
router.post("/locations", createLocation);
router.get("/locations", getLocations);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

// Promote Partner
router.put("/promote/:id", promotePartner);

module.exports = router;
