require("dotenv").config({ override: true });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Route imports
const busRoutes = require("./routes/busRoutes");
const eventRoutes = require("./routes/eventRoutes");
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/auth"); // Make sure this file exists from Step 4
const adminRoutes = require("./routes/adminRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const chatRoutes = require("./routes/chatRoutes");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
// Model imports
const User = require("./models/User"); // Make sure this file exists from Step 2

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
// 1. CORS configuration updated to allow cookie sharing with React
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend port
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "campusx_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// 3. Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Campus-X API is running",
  });
});

// Feature routes
app.use("/api/buses", busRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes); // New authentication routes
app.use("/api/admin", adminRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/lost-found", lostFoundRoutes);
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