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

// POST /api/events — create a new event
router.post("/", async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    if (!title || !date || !location || !description) {
      return res.status(400).json({ error: "Title, date, location, and description are required" });
    }

    const maxOrder = await Event.findOne().sort({ order: -1 }).select("order");
    const order = maxOrder ? maxOrder.order + 1 : 1;

    const event = await Event.create({ title, date, location, description, order });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
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

// DELETE /api/events/:eventId — delete an event
router.delete("/:eventId", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
