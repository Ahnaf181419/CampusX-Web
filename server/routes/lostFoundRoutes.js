const express = require("express");
const router = express.Router();

const LostFound = require("../models/LostFound");
const { isAdmin } = require("../middleware/authMiddleware");

// Get all lost/found items
router.get("/", async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch items",
    });
  }
});

// Create a lost/found item
router.post("/", async (req, res) => {
  try {
    const { title, type, location, date, description, contact } = req.body;

    const item = new LostFound({
      title,
      type,
      location,
      date,
      description,
      contact,
    });

    await item.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create item",
    });
  }
});

// Delete a lost/found item - Admin only
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const item = await LostFound.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete item",
    });
  }
});

module.exports = router;