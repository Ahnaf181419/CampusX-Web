const express = require("express");
const Room = require("../models/Room");

const router = express.Router();
const { isAdmin } = require("../middleware/authMiddleware");

// GET /api/rooms — list every room sorted by order
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ order: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to load rooms" });
  }
});

// POST /api/rooms — create a new room (admin only)
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, number, status, nextAvailableTime } = req.body;

    if (!name || !number || !status || !nextAvailableTime) {
      return res.status(400).json({ error: "Name, number, status, and next available time are required" });
    }

    const maxOrder = await Room.findOne().sort({ order: -1 }).select("order");
    const order = maxOrder ? maxOrder.order + 1 : 1;

    const room = await Room.create({ name, number, status, nextAvailableTime, order });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
});

// DELETE /api/rooms/:roomId — delete a room (admin only)
router.delete("/:roomId", isAdmin, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room" });
  }
});

module.exports = router;