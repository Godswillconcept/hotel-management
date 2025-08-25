const { get } = require("../app");
const Booking = require("../models/Booking");

const storeBooking = async (req, res) => {
  let { guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status } = req.body;
  
  try {
    const booking = Booking.fill({ guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status });
    await booking.insert();
    
    res.json({
      status: "success",
      message: "Booking added successfully",
      data: booking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to create booking: " + error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.fetch();
    res.json({
      status: "success",
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch bookings: " + error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  let { booking_id } = req.params;
  
  try {
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch booking: " + error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  let { id } = req.params;
  let { guest_id, room_id, check_in_date, check_out_date, total_amount, status, payment_status } = req.body;
  
  try {
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update booking: " + error.message,
    });
  }
};

const partialBookingUpdate = async (req, res) => {
  let { id } = req.params;
  
  try {
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update booking: " + error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  let { id } = req.params;
  
  try {
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete booking: " + error.message,
    });
  }
};

// Updated to include hotel details
const getGuestBookings = async (req, res) => {
  const { guestId } = req.params;
  
  try {
    console.log(`Fetching bookings for guest: ${guestId}`);

    // Query with JOIN to get hotel and room details
    const query = `
      SELECT 
        b.id,
        b.guest_id,
        b.room_id,
        b.check_in_date,
        b.check_out_date,
        b.status,
        b.total_amount,
        b.payment_status,
        b.created_at,
        b.updated_at,
        h.id as hotel_id,
        h.name as hotel_name,
        h.address as hotel_address,
        h.city as hotel_city,
        h.country as hotel_country,
        CONCAT(h.city, ', ', h.country) as hotel_location,
        h.contact_email as hotel_email,
        h.phone_number as hotel_phone,
        h.hotel_image,
        h.price_per_night as hotel_price,
        r.room_number,
        r.type as room_type,
        r.price_per_night as room_price,
        4.5 as hotel_rating
      FROM bookings b
      INNER JOIN rooms r ON b.room_id = r.id
      INNER JOIN hotels h ON r.hotel_id = h.id
      WHERE b.guest_id = ?
      ORDER BY b.created_at DESC
    `;

    const bookings = await Booking.query(query, [guestId]);
    
    console.log(`Found ${bookings.length} bookings for guest ${guestId}`);

    // Transform the data to include proper fields
    const transformedBookings = bookings.map(booking => ({
      id: booking.id,
      guest_id: booking.guest_id,
      room_id: booking.room_id,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      status: booking.status,
      total_amount: booking.total_amount,
      payment_status: booking.payment_status,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      hotel_id: booking.hotel_id,
      hotel_name: booking.hotel_name,
      hotel_location: booking.hotel_location,
      hotel_address: booking.hotel_address,
      hotel_city: booking.hotel_city,
      hotel_country: booking.hotel_country,
      hotel_email: booking.hotel_email,
      hotel_phone: booking.hotel_phone,
      hotel_image: booking.hotel_image || 'assets/images/raddison.png',
      hotel_price: booking.hotel_price || 75000,
      hotel_rating: booking.hotel_rating || 4.5,
      room_number: booking.room_number,
      room_type: booking.room_type,
      room_price: booking.room_price,
      // Add fallback fields for compatibility
      name: booking.hotel_name,
      location: booking.hotel_location,
      image: booking.hotel_image || 'assets/images/raddison.png',
      price: booking.total_amount,
      rating: booking.hotel_rating || 4.5,
    }));

    res.json({
      status: "success",
      message: "Guest bookings fetched successfully",
      data: transformedBookings,
    });
  } catch (error) {
    console.error('Error fetching guest bookings:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch guest bookings: " + error.message,
    });
  }
};

module.exports = {
  storeBooking,
  getBookings,
  getBookingById,
  updateBooking,
  partialBookingUpdate,
  deleteBooking,
  getGuestBookings
};
