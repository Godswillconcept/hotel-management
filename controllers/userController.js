const User = require("../models/User");
require("dotenv").config();
const { hash, compare} = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  process.env.JWT_SECRET || "what is your name";
const storeUser = async (req, res) => {
    let {
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number } = req.body;
    const user = User.fill({    
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number });
    user.password = await hash(user.password, 10);
    if (req.files?.profile_picture) {
        const { profile_picture } = req.files;
        const fileName = `${Date.now()}-${profile_picture.name}`;
        const filePath = `uploads/users/${fileName}`;
        await profile_picture.mv(filePath);
        user.profile_picture = filePath;
    }
    await user.insert();
    res.json({
        status: "success",
        message: "User added successfully",
        data: user,
    });
};

const getUsers = async (req, res) => {
    const users = await User.fetch();
    res.json({
        status: "success",
        message: "Users fetched successfully",
        data: users,
    });
};

const getUserById = async (req, res) => {
    let { id } = req.params;
    const user = await User.find(id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
    res.json({
        status: "success",
        message: "User fetched successfully",
        data: user,
    });
};

const updateUser = async (req, res) => {
    let { id } = req.params;
    let { user_id,
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number } = req.body;
    const user = await User.find(id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
    user.fill({ user_id,
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number });

    await user.update();

    res.json({
        status: "success",
        message: "User updated successfully",
        data: user,
    });
};

const partialUserUpdate = async (req, res) => {
    let { id } = req.params;
    const user = await User.find(id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
    user.fill(req.body);

    await user.update();

    res.json({
        status: "success",
        message: "User updated successfully",
        data: user,
    });
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    const deleted = await User.delete(id);
    if (!deleted) {
        return res.status(404).json({
            status: "error",
            message: "Failed to delete user",
        });
    }

    res.json({
        status: "success",
        message: "User deleted successfully",
    });
};


const apiLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Email and password are required",
        });
    }
    // Check if the user exists
    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({
            status: "error",
            message: "Invalid email or password",
        });
    }
    // Check if the password is correct
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            status: "error",
            message: "Invalid email or password",
        });
    }
    // Generate a token
    const token = jwt.sign({ user: user }, JWT_SECRET, { expiresIn: "1h" });
    // Send the token to the client
    res.json({
        status: "success",
        message: "Login successful",
        data: { token },
    });
};


module.exports = {
    storeUser,
    getUsers,
    getUserById,
    updateUser,
    partialUserUpdate,
    deleteUser,
    apiLogin
};
