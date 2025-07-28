const { Router } = require("express");
const { resolve } = require("path");
const router = Router();


const { storeBooking, getBookings, getBookingById, updateBooking, partialBookingUpdate, deleteBooking } = require("../controllers/bookingController");
const { storeGuest, getGuests, getGuestById, updateGuest, partialGuestUpdate, deleteGuest } = require("../controllers/guestController");
const { storeHotel, getHotels, getHotelById, updateHotel, partialHotelUpdate, deleteHotel } = require("../controllers/hotelController");
const { storePayment, getPayments, getPaymentById, partialPaymentUpdate, deletePayment } = require("../controllers/paymentController");
const { storeRoom, getRooms, getRoomById, updateRoom, partialRoomUpdate, deleteRoom } = require("../controllers/roomController");
const { storeRoomservice, getRoomservices, getRoomserviceById, updateRoomservice, partialRoomserviceUpdate, deleteRoomservice } = require("../controllers/roomserviceController");
const { storeUser, getUsers, getUserById, updateUser, partialUserUpdate, deleteUser } = require("../controllers/userController");




router.get("/", (req, res) => {
    res.sendFile(resolve("views", "guest", "dashboard.html"));
});


// Bookings
router.post("/bookings", storeBooking);
router.get("/bookings", getBookings);
router.get("/bookings/:id", getBookingById);
router.put("/bookings/:id", updateBooking);
router.patch("/bookings/:id", partialBookingUpdate);
router.delete("/bookings/:id", deleteBooking);

// Guests
router.post("/guests", storeGuest);
router.get("/guests", getGuests);
router.get("/guests/:id", getGuestById);
router.put("/guests/:id", updateGuest);
router.patch("/guests/:id", partialGuestUpdate);
router.delete("/guests/:id", deleteGuest);

// Hotels
router.post("/hotels", storeHotel);
router.get("/hotels", getHotels);
router.get("/hotels/:id", getHotelById);
router.put("/hotels/:id", updateHotel);
router.patch("/hotels/:id", partialHotelUpdate);
router.delete("/hotels/:id", deleteHotel);

// Payments
router.post("/payments", storePayment);
router.get("/payments", getPayments);
router.get("/payments/:id", getPaymentById);
router.patch("/payments/:id", partialPaymentUpdate);
router.delete("/payments/:id", deletePayment);

// Rooms
router.post("/rooms", storeRoom);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.put("/rooms/:id", updateRoom);
router.patch("/rooms/:id", partialRoomUpdate);
router.delete("/rooms/:id", deleteRoom);

// Roomservices
router.post("/roomservices", storeRoomservice);
router.get("/roomservices", getRoomservices);
router.get("/roomservices/:id", getRoomserviceById);
router.put("/roomservices/:id", updateRoomservice);
router.patch("/roomservices/:id", partialRoomserviceUpdate);
router.delete("/roomservices/:id", deleteRoomservice);

// Users
router.post("/users", storeUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.patch("/users/:id", partialUserUpdate);
router.delete("/users/:id", deleteUser);


module.exports = router;
