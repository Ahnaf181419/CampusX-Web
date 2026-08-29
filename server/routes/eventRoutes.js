const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// GET /api/events — list every event sorted by date
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ order: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to load events" });
  }
});

// PATCH /api/events/:eventId — update an event's status
// body: { action: "complete" | "start" | "upcoming" }
router.patch("/:eventId", async (req, res) => {
  try {
    const { action } = req.body;
    const event = await Event.findOne({ _id: req.params.eventId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (action === "complete") {
      event.status = "Completed";
    } else if (action === "start") {
      event.status = "Ongoing";
    } else if (action === "upcoming") {
      event.status = "Upcoming";
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

module.exports = router;
