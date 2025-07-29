require("dotenv").config();
const { hash, compare } = require("bcrypt");
const Guest = require("../models/Guest");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  process.env.JWT_SECRET || "what is your name";


const storeGuest = async (req, res) => {
  let { full_name, password, phone_number, email, address } = req.body;
  const guest = Guest.fill({ full_name, password, phone_number, email, address });
  guest.password = await hash(guest.password, 10);
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

const guestLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }
  // Check if the guest exists
  const guest = await Guest.findByEmail(email);
  if (!guest) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }
  // Check if the password is correct (support both hashed and plain text for now)
  let isValidPassword = false;
  try {
    isValidPassword = await compare(password, guest.password);
  } catch (e) { }
  if (!isValidPassword && password !== guest.password) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",

    });
  }
  // Generate a token if needed
<<<<<<< HEAD
  const token = jwt.sign({ id: guest.id, role:"guest" }, JWT_SECRET, { expiresIn: "7d" });
=======
  const token = jwt.sign({ id: guest.id, role: "guest" }, JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
>>>>>>> f7534af0f481ed30fec2cb8a802c7271124cec86
  res.json({
    status: "success",
    message: "Login successful",
    data: { token },
  });
};


module.exports = {
  storeGuest,
  getGuests,
  getGuestById,
  updateGuest,
  partialGuestUpdate,
  deleteGuest,
  guestLogin
};
