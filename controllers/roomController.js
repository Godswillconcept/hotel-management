const Room = require("../../models/Room");
const storeRoom = async (req, res) => {
    let { room_id, hotel_id, room_number, type, price_per_night, status, floor, description } = req.body;
    const room = Room.fill({ room_id, hotel_id, room_number, type, price_per_night, status, floor, description });
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

module.exports = {
    storeRoom,
    getRooms,
    getRoomById,
    updateRoom,
    partialRoomUpdate,
    deleteRoom,
};
