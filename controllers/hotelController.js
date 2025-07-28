const Hotel = require("../models/Hotel");
const storeHotel = async (req, res) => {
  let { hotel_id,name,address,city,country,contact_email,phone_number } = req.body;
  const hotel = Hotel.fill({ hotel_id,name,address,city,country,contact_email,phone_number });
  await hotel.insert();
  res.json({
    status: "success",
    message: "Hotel added successfully",
    data: hotel,
  });
};

const getHotels = async (req, res) => {
  const hotels = await Hotel.fetch();
  res.json({
    status: "success",
    message: "Hotels fetched successfully",
    data: hotels,
  });
};

const getHotelById = async (req, res) => {
  let { id } = req.params;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  res.json({
    status: "success",
    message: "Hotel fetched successfully",
    data: hotel,
  });
};

const updateHotel = async (req, res) => {
  let { id } = req.params;
  let {hotel_id,name,address,city,country,contact_email,phone_number} = req.body;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  hotel.fill({ hotel_id,name,address,city,country,contact_email,phone_number });

  await hotel.update();

  res.json({
    status: "success",
    message: "Hotel updated successfully",
    data: hotel,
  });
};

const partialHotelUpdate = async (req, res) => {
  let { id } = req.params;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  hotel.fill(req.body);

  await hotel.update();

  res.json({
    status: "success",
    message: "Hotel updated successfully",
    data: hotel,
  });
};

const deleteHotel = async (req, res) => {
  let { id } = req.params;
  const deleted = await Hotel.delete(id);
  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Failed to delete hotel",
    });
  }

  res.json({
    status: "success",
    message: "Hotel deleted successfully",
  });
};

const attachInstructor = async (req, res) => {
  let { id } = req.params;
  const hotel = await Hotel.find(id);
  if (!hotel) {
    return res.status(404).json({
      status: "error",
      message: "Hotel not found",
    });
  }
  let { instructor_id } = req.body;
  hotel.instructor_id = instructor_id;

  await hotel.save();

  res.json({
    status: "success",
    message: "Instructor attached successfully",
    data: hotel,
  });
};

module.exports = {
  storeHotel,
  getHotels,
  getHotelById,
  updateHotel,
  partialHotelUpdate,
  deleteHotel,
  attachInstructor,
};
