const { Router } = require("express");
const router = Router();
const { apiLogin } = require("../controllers/userController");
const { guestLogin, storeGuest, verifyGuestEmail, resendOtp } = require("../controllers/guestController");
const { storeBooking,getGuestBookings } = require("../controllers/bookingController");
const { storePayment } = require("../controllers/paymentController");
const {
  storeRoom,
  getRooms,
  getRoomById,
  updateRoom,
  partialRoomUpdate,
  deleteRoom,
  getHotelRooms,
  getAvailableRooms
} = require('../controllers/roomController');

const { storeBookmark, getBookmarks, deleteBookmark } = require("../controllers/bookmarkController");
const { getHotels,searchHotels,getHotelsByCity,getHotelById } = require("../controllers/hotelController");

const {
  getBookings,
  getBookingById,
  updateBooking,
  partialBookingUpdate,
  deleteBooking,
} = require('../controllers/bookingController');

// Public login routes (no authentication required)
router.post("/login", apiLogin); // Admin/user login
router.post("/guest/login", guestLogin); // Guest login

// Public guest registration routes (no authentication required)
router.post("/guests", storeGuest); // Register guest (saves to temp_registrations)
router.post("/guests/verify-email", verifyGuestEmail); // Verify OTP and create actual guest
router.post("/guests/resend-otp", resendOtp); // Resend OTP
router.post('/bookings', storeBooking);
router.get('/bookings/guest/:id', getGuestBookings);
router.post("/payments", storePayment);

// Bookmark routes
router.post("/bookmarks", storeBookmark);
router.get("/bookmarks", getBookmarks);
router.delete("/bookmarks/:id", deleteBookmark);

// Hotel routes for frontend
router.get("/hotels", getHotels);
router.get("/hotels/search", searchHotels);
router.get("/hotels/city/:city", getHotelsByCity);
router.get("/hotels/:id", getHotelById);

router.post('/bookings', storeBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id', updateBooking);
router.patch('/bookings/:id', partialBookingUpdate);
router.delete('/bookings/:id', deleteBooking);

router.post('/payment', storePayment);

router.post('/rooms', storeRoom);
router.get('/rooms/available', getAvailableRooms);
router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoomById);
router.put('/rooms/:id', updateRoom);
router.patch('/rooms/:id', partialRoomUpdate);
router.delete('/rooms/:id', deleteRoom);
router.get('/hotel/:id', getHotelRooms);

module.exports = router;