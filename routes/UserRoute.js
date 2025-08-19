const { Router } = require("express");
const router = Router();
const { apiLogin } = require("../controllers/userController");
const { guestLogin, storeGuest, verifyGuestEmail, resendOtp } = require("../controllers/guestController");

// Public login routes (no authentication required)
router.post("/login", apiLogin); // Admin/user login
router.post("/guest/login", guestLogin); // Guest login

// Public guest registration routes (no authentication required)
router.post("/guests", storeGuest); // Register guest (saves to temp_registrations)
router.post("/guests/verify-email", verifyGuestEmail); // Verify OTP and create actual guest
router.post("/guests/resend-otp", resendOtp); // Resend OTP

module.exports = router;