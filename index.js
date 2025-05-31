require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const logger = require("./middlewares/logger");
const { authMiddleware } = require("./middlewares/authMiddleware");
const partnerRoutes = require("./routes/partnerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/inquiry", inquiryRoutes);

// Test protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello, your role is ${req.user.role}`, user: req.user });
});

// Error handler middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
