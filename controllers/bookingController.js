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

// Simplified getGuestBookings function
const getGuestBookings = async (req, res) => {
  const { guestId, id } = req.params; // Handle both :guestId and :id
  const actualGuestId = guestId || id; // Use whichever is available
  
  try {
    console.log(`=== FETCHING BOOKINGS FOR GUEST: ${actualGuestId} ===`);
    console.log('Route params:', req.params);

    // Simple query first to verify data exists
    const simpleQuery = `SELECT * FROM bookings WHERE guest_id = ?`;
    const bookings = await Booking.query(simpleQuery, [actualGuestId]);
    
    console.log(`Found ${bookings.length} bookings for guest ${actualGuestId}`);

    if (bookings.length === 0) {
      return res.json({
        status: "success", 
        message: "No bookings found for this guest",
        data: [],
      });
    }

    // Transform bookings with default hotel data for now
    const transformedBookings = bookings.map(booking => ({
      id: booking.id,
      guest_id: booking.guest_id,
      room_id: booking.room_id,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      status: booking.status,
      total_amount: parseFloat(booking.total_amount) || 0,
      payment_status: booking.payment_status,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      
      // Default hotel data (since rooms might not have proper hotel relationships)
      hotel_id: 1,
      hotel_name: 'Grand Plaza Hotel',
      hotel_city: 'Lagos',
      hotel_country: 'Nigeria',
      hotel_location: 'Lagos, Nigeria',
      hotel_address: 'Victoria Island, Lagos',
      hotel_image: 'assets/images/raddison.png',
      hotel_price: parseFloat(booking.total_amount) || 75000,
      hotel_rating: 4.5,
      
      // Default room data
      room_number: `Room ${booking.room_id}`,
      room_type: 'Standard',
      room_price: parseFloat(booking.total_amount) || 0,
      
      // Compatibility fields for frontend
      name: 'Grand Plaza Hotel',
      location: 'Lagos, Nigeria', 
      image: 'assets/images/raddison.png',
      price: parseFloat(booking.total_amount) || 0,
      rating: 4.5,
    }));

    console.log(`Returning ${transformedBookings.length} transformed bookings`);

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
