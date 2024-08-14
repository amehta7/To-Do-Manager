const jwt = require("jsonwebtoken");
const User = require("../models/user");

// User Registration
const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Try any other email, this email is already registered!",
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ success: true, message: "User registered" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// User Login
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//Get User
const getUser = async (req, res) => {
  try {
    // req.user is populated by authenticateToken middleware
    //console.log(req.user);
    const user = await User.findById(req.user.id).select("username email"); // Adjust fields as needed
    //console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Register, Login, getUser };
