const otpStore = new Map();

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = (email) => {
  const otp = generateOtp();
  otpStore.set(email, otp);
  console.log(`Mock OTP for ${email}: ${otp}`);
  return otp;
};

const verifyOtp = (email, otp) => {
  const validOtp = otpStore.get(email);
  if (validOtp && validOtp === otp) {
    otpStore.delete(email);
    return true;
  }
  return false;
};

module.exports = { sendOtp, verifyOtp };
