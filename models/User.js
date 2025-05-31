const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String },
  role: { type: String, enum: ["client", "partner", "admin"], required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  // Partner-specific fields
  personalDetails: {
    name: String,
    phone: String,
    // add more fields as needed
  },
  documents: {
    aadharNumber: String,
    // add document metadata here
  },
  portfolio: [{ type: String }], // array of portfolio image URLs (mocked)

  // OTP related
  otpVerified: { type: Boolean, default: false },
});

// Virtual for password set
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(password, 10);
  })
  .get(function () {
    return this._password;
  });

// Password compare method
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model("User", UserSchema);
