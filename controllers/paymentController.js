const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const storePayment = async (req, res) => {
    let { booking_id, payment_date, amount, method, status } = req.body;
    const payment = Payment.fill({ booking_id, payment_date, amount, method, status });
    await payment.insert();
    res.json({
        status: "success",
        message: "Payment added successfully",
        data: payment,
    });
};

const getPayments = async (req, res) => {
    const payments = await Payment.fetch();
    res.json({
        status: "success",
        message: "Payments fetched successfully",
        data: payments,
    });
};

const getPaymentById = async (req, res) => {
    let { id } = req.params;
    const payment = await Payment.find(id);
    if (!payment) {
        return res.status(404).json({
            status: "error",
            message: "Payment not found",
        });
    }
    res.json({
        status: "success",
        message: "Payment fetched successfully",
        data: payment,
    });
};

const partialPaymentUpdate = async (req, res) => {
    let { id } = req.params;
    const payment = await Payment.find(id);
    if (!payment) {
        return res.status(404).json({
            status: "error",
            message: "Payment not found",
        });
    }
    payment.fill(req.body);

    await payment.update();

    res.json({
        status: "success",
        message: "Payment updated successfully",
        data: payment,
    });
};

const deletePayment = async (req, res) => {
    let { id } = req.params;
    const deleted = await Payment.delete(id);
    if (!deleted) {
        return res.status(404).json({
            status: "error",
            message: "Failed to delete payment",
        });
    }

    res.json({
        status: "success",
        message: "Payment deleted successfully",
    });
};

const getGuestPayments = async (req, res) => {
  const { guestId } = req.params;
  
  try {
    console.log(`=== FETCHING PAYMENTS FOR GUEST: ${guestId} ===`);

    // Query payments with booking and hotel details
    const query = `
      SELECT 
        p.id as payment_id,
        p.booking_id,
        p.amount,
        p.payment_date,
        p.method,
        p.status as payment_status,
        p.created_at as payment_created_at,
        b.id as booking_id,
        b.guest_id,
        b.room_id,
        b.check_in_date,
        b.check_out_date,
        b.status as booking_status,
        b.total_amount,
        b.payment_status as booking_payment_status,
        b.created_at as booking_created_at,
        h.id as hotel_id,
        h.name as hotel_name,
        h.address as hotel_address,
        h.city as hotel_city,
        h.country as hotel_country,
        h.hotel_image,
        h.price_per_night as hotel_price,
        r.room_number,
        r.type as room_type
      FROM payments p
      INNER JOIN bookings b ON p.booking_id = b.id
      LEFT JOIN rooms r ON b.room_id = r.id
      LEFT JOIN hotels h ON r.hotel_id = h.id
      WHERE b.guest_id = ?
      ORDER BY p.created_at DESC
    `;

    console.log('Executing payment query:', query);
    console.log('With guest_id:', guestId);

    const payments = await Booking.query(query, [guestId]);
    
    console.log(`Found ${payments.length} payments for guest ${guestId}`);
    
    // Transform the data
    const transformedPayments = payments.map(payment => ({
      // Payment details
      payment_id: payment.payment_id,
      booking_id: payment.booking_id,
      amount: parseFloat(payment.amount) || 0,
      payment_date: payment.payment_date,
      payment_method: payment.method || 'Cash',
      payment_status: payment.payment_status || 'Completed',
      payment_created_at: payment.payment_created_at,
      
      // Booking details
      guest_id: payment.guest_id,
      room_id: payment.room_id,
      check_in_date: payment.check_in_date,
      check_out_date: payment.check_out_date,
      booking_status: payment.booking_status,
      total_amount: parseFloat(payment.total_amount) || 0,
      booking_payment_status: payment.booking_payment_status,
      booking_created_at: payment.booking_created_at,
      
      // Hotel details
      hotel_id: payment.hotel_id || 1,
      hotel_name: payment.hotel_name || 'Grand Plaza Hotel',
      hotel_address: payment.hotel_address || 'Victoria Island, Lagos',
      hotel_city: payment.hotel_city || 'Lagos',
      hotel_country: payment.hotel_country || 'Nigeria',
      hotel_location: `${payment.hotel_city || 'Lagos'}, ${payment.hotel_country || 'Nigeria'}`,
      hotel_image: payment.hotel_image || 'assets/images/raddison.png',
      hotel_price: parseFloat(payment.hotel_price) || 85000,
      
      // Room details
      room_number: payment.room_number || `Room ${payment.room_id}`,
      room_type: payment.room_type || 'Standard',
      
      // Compatibility fields
      name: payment.hotel_name || 'Grand Plaza Hotel',
      location: `${payment.hotel_city || 'Lagos'}, ${payment.hotel_country || 'Nigeria'}`,
      image: payment.hotel_image || 'assets/images/raddison.png',
    }));

    console.log('Final transformed payments:', transformedPayments);

    res.json({
      status: "success",
      message: "Guest payments fetched successfully",
      data: transformedPayments,
    });

  } catch (error) {
    console.error('Error fetching guest payments:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch guest payments: " + error.message,
    });
  }
};

module.exports = {
    storePayment,
    getPayments,
    getPaymentById,
    partialPaymentUpdate,
    deletePayment,
    getGuestPayments,
};
