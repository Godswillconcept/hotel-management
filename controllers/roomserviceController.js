const Roomservice = require("../../models/Roomservice");
const storeRoomservice = async (req, res) => {
    let { service_id,
        room_id,
        request_type,
        request_time,
        status,
        email } = req.body;
    const roomservice = Roomservice.fill({
        service_id,
        room_id,
        request_type,
        request_time,
        status,
        email
    });
    await roomservice.insert();
    res.json({
        status: "success",
        message: "Roomservice added successfully",
        data: roomservice,
    });
};

const getRoomservices = async (req, res) => {
    const roomservices = await Roomservice.fetch();
    res.json({
        status: "success",
        message: "Roomservices fetched successfully",
        data: roomservices,
    });
};

const getRoomserviceById = async (req, res) => {
    let { id } = req.params;
    const roomservice = await Roomservice.find(id);
    if (!roomservice) {
        return res.status(404).json({
            status: "error",
            message: "Roomservice not found",
        });
    }
    res.json({
        status: "success",
        message: "Roomservice fetched successfully",
        data: roomservice,
    });
};

const updateRoomservice = async (req, res) => {
    let { id } = req.params;
    let { service_id,
        room_id,
        request_type,
        request_time,
        status,
        email } = req.body;
    const roomservice = await Roomservice.find(id);
    if (!roomservice) {
        return res.status(404).json({
            status: "error",
            message: "Roomservice not found",
        });
    }
    roomservice.fill({
        service_id,
        room_id,
        request_type,
        request_time,
        status,
        email
    });

    await roomservice.update();

    res.json({
        status: "success",
        message: "Roomservice updated successfully",
        data: roomservice,
    });
};

const partialRoomserviceUpdate = async (req, res) => {
    let { id } = req.params;
    const roomservice = await Roomservice.find(id);
    if (!roomservice) {
        return res.status(404).json({
            status: "error",
            message: "Roomservice not found",
        });
    }
    roomservice.fill(req.body);

    await roomservice.update();

    res.json({
        status: "success",
        message: "Roomservice updated successfully",
        data: roomservice,
    });
};

const deleteRoomservice = async (req, res) => {
    let { id } = req.params;
    const deleted = await Roomservice.delete(id);
    if (!deleted) {
        return res.status(404).json({
            status: "error",
            message: "Failed to delete roomservice",
        });
    }

    res.json({
        status: "success",
        message: "Roomservice deleted successfully",
    });
};


module.exports = {
    storeRoomservice,
    getRoomservices,
    getRoomserviceById,
    updateRoomservice,
    partialRoomserviceUpdate,
    deleteRoomservice,
};
