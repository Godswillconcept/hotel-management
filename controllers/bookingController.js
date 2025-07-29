const Booking = require("../models/Booking");
const storeBooking = async (req, res) => {
  let {  guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status } = req.body;
  const booking = Booking.fill({  guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status });
  await booking.insert();
  res.json({
    status: "success",
    message: "Booking added successfully",
    data: booking,
  });
};

const getBookings = async (req, res) => {
  const bookings = await Booking.fetch();
  res.json({
    status: "success",
    message: "Bookings fetched successfully",
    data: bookings,
  });
};

const getBookingById = async (req, res) => {
  let { booking_id } = req.params;
  const booking = await Booking.find(booking_id);
  if (!booking) {
    return res.status(404).json({
      status: "error",
      message: "Booking not found",
    });
  }
  res.json({
    status: "success",
    message: "Booking fetched successfully",
    data: booking,
  });
};

const updateBooking = async (req, res) => {
  let { id } = req.params;
  let { guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status} = req.body;
  const booking = await Booking.find(id);
  if (!booking) {
    return res.status(404).json({
      status: "error",
      message: "Booking not found",
    });
  }
  booking.fill({ guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status });

  await booking.update();

  res.json({
    status: "success",
    message: "Booking updated successfully",
    data: booking,
  });
};

const partialBookingUpdate = async (req, res) => {
  let { id } = req.params;
  const booking = await Booking.find(id);
  if (!booking) {
    return res.status(404).json({
      status: "error",
      message: "Booking not found",
    });
  }
  booking.fill(req.body);

  await booking.update();

  res.json({
    status: "success",
    message: "Booking updated successfully",
    data: booking,
  });
};

const deleteBooking = async (req, res) => {
  let { id } = req.params;
  const deleted = await Booking.delete(id);
  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Failed to delete booking",
    });
  }

  res.json({
    status: "success",
    message: "Booking deleted successfully",
  });
};



module.exports = {
  storeBooking,
  getBookings,
  getBookingById,
  updateBooking,
  partialBookingUpdate,
  deleteBooking,
};
