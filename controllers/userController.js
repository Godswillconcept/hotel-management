const User = require("../../models/User");
const storeUser = async (req, res) => {
    let { user_id,
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number } = req.body;
    const user = User.fill({ user_id,
        hotel_id,
        username,
        password,
        full_name,
        role,
        email,
        phone_number });
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



module.exports = {
    storeUser,
    getUsers,
    getUserById,
    updateUser,
    partialUserUpdate,
    deleteUser,
};
