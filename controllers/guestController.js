const Guest = require("../models/Guest");
const storeGuest = async (req, res) => {
  let { full_name,password, phone_number, email, address } = req.body;
  const guest = Guest.fill({ full_name,password,phone_number, email, address });
   if (req.files?.id_document) {
    const { id_document } = req.files;
    const fileName = `${Date.now()}-${id_document.name}`;
    const filePath = `uploads/guests/${fileName}`;
    await id_document.mv(filePath);
    guest.id_document = filePath;
  }
  await guest.insert();
  res.json({
    status: "success",
    message: "Guest added successfully",
    data: guest,
  });
};

const getGuests = async (req, res) => {
  const guests = await Guest.fetch();
  res.json({
    status: "success",
    message: "Guests fetched successfully",
    data: guests,
  });
};

const getGuestById = async (req, res) => {
  let { id } = req.params;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  res.json({
    status: "success",
    message: "Guest fetched successfully",
    data: guest,
  });
};

const updateGuest = async (req, res) => {
  let { id } = req.params;
  let { full_name, phone_number, email, address } = req.body;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  guest.fill({ full_name, phone_number, email, address });

  await guest.update();

  res.json({
    status: "success",
    message: "Guest updated successfully",
    data: guest,
  });
};

const partialGuestUpdate = async (req, res) => {
  let { id } = req.params;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  guest.fill(req.body);

  await guest.update();

  res.json({
    status: "success",
    message: "Guest updated successfully",
    data: guest,
  });
};

const deleteGuest = async (req, res) => {
  let { id } = req.params;
  const deleted = await Guest.delete(id);
  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Failed to delete guest",
    });
  }

  res.json({
    status: "success",
    message: "Guest deleted successfully",
  });
};



module.exports = {
  storeGuest,
  getGuests,
  getGuestById,
  updateGuest,
  partialGuestUpdate,
  deleteGuest,
};
