const express = require("express");
const { Register, Login, getUser } = require("../controllers/auth");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/info", auth, getUser);

module.exports = router;
