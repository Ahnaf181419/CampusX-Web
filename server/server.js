const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const busRoutes = require("./routes/busRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Campus-X API is running",
  });
});

// Feature routes
app.use("/api/buses", busRoutes);

// Connect to MongoDB
// family: 4 forces IPv4 — DNS64/NAT64 networks return IPv6 addresses
// that break the driver's TLS handshake
mongoose
  .connect(MONGO_URI, { family: 4 })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });