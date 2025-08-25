const Room = require("../models/Room");
const storeRoom = async (req, res) => {
    let { hotel_id, room_number, type, price_per_night, status, floor, description } = req.body;
    const room = Room.fill({  hotel_id, room_number, type, price_per_night, status, floor, description });
    await room.insert();
    res.json({
        status: "success",
        message: "Room added successfully",
        data: room,
    });
};

const getRooms = async (req, res) => {
    const rooms = await Room.fetch();
    res.json({
        status: "success",
        message: "Rooms fetched successfully",
        data: rooms,
    });
};

const getRoomById = async (req, res) => {
    let { id } = req.params;
    const room = await Room.find(id);
    if (!room) {
        return res.status(404).json({
            status: "error",
            message: "Room not found",
        });
    }
    res.json({
        status: "success",
        message: "Room fetched successfully",
        data: room,
    });
};

const updateRoom = async (req, res) => {
    let { id } = req.params;
    let { room_id, hotel_id, room_number, type, price_per_night, status, floor, description } = req.body;
    const room = await Room.find(id);
    if (!room) {
        return res.status(404).json({
            status: "error",
            message: "Room not found",
        });
    }
    room.fill({ room_id, hotel_id, room_number, type, price_per_night, status, floor, description });
    await room.update();

    res.json({
        status: "success",
        message: "Room updated successfully",
        data: room,
    });
};

const partialRoomUpdate = async (req, res) => {
    let { id } = req.params;
    const room = await Room.find(id);
    if (!room) {
        return res.status(404).json({
            status: "error",
            message: "Room not found",
        });
    }
    room.fill(req.body);

    await room.update();

    res.json({
        status: "success",
        message: "Room updated successfully",
        data: room,
    });
};

const deleteRoom = async (req, res) => {
    let { id } = req.params;
    const deleted = await Room.delete(id);
    if (!deleted) {
        return res.status(404).json({
            status: "error",
            message: "Failed to delete room",
        });
    }

    res.json({
        status: "success",
        message: "Room deleted successfully",
    });
};
const getHotelRooms = async (req, res) => {
    const { hotelId } = req.params;
    const rooms = await Room.find({ hotel_id: hotelId });
    res.json({
        status: "success",
        message: "Hotel rooms fetched successfully",
        data: rooms,
    });
};

const getAvailableRooms = async (req, res) => {
  try {
    const { hotel_id, check_in, check_out } = req.query;
    
    if (!hotel_id) {
      return res.status(400).json({
        status: "error",
        message: "Hotel ID is required",
      });
    }

    console.log(`Getting available rooms for hotel: ${hotel_id}`);
    console.log(`Check-in: ${check_in}, Check-out: ${check_out}`);

    // Get all rooms for the hotel that are not booked during the requested period
    let query = `
      SELECT r.* 
      FROM rooms r
      WHERE r.hotel_id = ? 
      AND r.status = 'Available'
    `;

    let params = [hotel_id];

    // If dates are provided, exclude rooms that are booked during this period
    if (check_in && check_out) {
      query += `
        AND r.id NOT IN (
          SELECT DISTINCT b.room_id 
          FROM bookings b 
          WHERE b.room_id = r.id 
          AND b.status IN ('Booked', 'Checked-In')
          AND (
            (b.check_in_date <= ? AND b.check_out_date > ?) OR
            (b.check_in_date < ? AND b.check_out_date >= ?) OR
            (b.check_in_date >= ? AND b.check_out_date <= ?)
          )
        )
      `;
      params.push(check_in, check_in, check_out, check_out, check_in, check_out);
    }

    query += ` ORDER BY r.room_number`;

    const rooms = await Room.query(query, params);

    console.log(`Found ${rooms.length} available rooms`);

    res.json({
      status: "success",
      message: "Available rooms fetched successfully",
      data: rooms,
    });
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch available rooms: " + error.message,
    });
  }
};
module.exports = {
    storeRoom,
    getRooms,
    getRoomById,
    updateRoom,
    partialRoomUpdate,
    deleteRoom,
    getHotelRooms,
    getAvailableRooms
};
