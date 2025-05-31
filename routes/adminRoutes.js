const express = require("express");
const router = express.Router();
const {
  getPendingVerifications,
  verifyPartner,
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

module.exports = router;
