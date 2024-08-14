const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // Parse JSON bodies

const corsOptions = {
  exposedHeaders: ["x-auth-token", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/tasks", require("./routes/task"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
