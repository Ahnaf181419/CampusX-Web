const express = require("express");
const Bus = require("../models/Bus");

const router = express.Router();

// GET /api/buses — list every bus with its live position
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find().sort({ order: 1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: "Failed to load buses" });
  }
});

// PATCH /api/buses/:busId — move the bus forward in the shared state
// body: { action: "start" | "stop" | "next" | "reset" }
router.patch("/:busId", async (req, res) => {
  try {
    const { action } = req.body;
    const bus = await Bus.findOne({ busId: req.params.busId });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    if (action === "start") {
      bus.isRunning = true;
    } else if (action === "stop") {
      bus.isRunning = false;
    } else if (action === "next") {
      if (bus.isRunning && bus.currentStopIndex < bus.stops.length - 1) {
        bus.currentStopIndex += 1;
      }
    } else if (action === "reset") {
      bus.currentStopIndex = 0;
      bus.isRunning = false;
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updatedBus = await bus.save();
    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ error: "Failed to update bus" });
  }
});

module.exports = router;
