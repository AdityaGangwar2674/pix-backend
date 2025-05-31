const User = require("../models/User");
const { generateToken } = require("../utils/jwtUtils");
const { sendOtp, verifyOtp } = require("../utils/emailOtpMock");

exports.signup = async (req, res) => {
  const { email, password, role, otp, personalDetails, documents } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // If OTP provided, verify it; otherwise, generate/send new OTP
    if (otp) {
      if (!verifyOtp(email, otp)) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } else {
      sendOtp(email);
      return res.status(200).json({ message: "OTP sent to email (mock)" });
    }

    // Create user
    const user = new User({ email, role, personalDetails, documents });
    if (password) user.password = password; // virtual sets hash

    user.isVerified = true; // OTP verified
    await user.save();

    const token = generateToken(user);

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.passwordHash)
      return res.status(400).json({ message: "Password login not enabled" });

    if (!user.comparePassword(password))
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
