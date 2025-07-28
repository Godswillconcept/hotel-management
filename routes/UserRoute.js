const { Router } = require("express");
const router = Router();
const { apiLogin } = require("../controllers/userController");
const { guestLogin } = require("../controllers/guestController");

router.post("/user/login", apiLogin); // api
router.post("/user/guest/login", guestLogin); // api
module.exports = router;