const express = require("express");
const router = express.Router();

const Notice = require("../models/Notice");
const { isAdmin } = require("../middleware/authMiddleware");

// Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.json(notices);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notices",
    });
  }
});

// Create a notice - Admin only
router.post("/", isAdmin, async (req, res) => {
  try {
    const { title, description, category, important } = req.body;

    const notice = new Notice({
      title,
      description,
      category,
      important,
    });

    await notice.save();

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create notice",
    });
  }
});

// Update a notice - Admin only
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { title, description, category, important } = req.body;

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        important,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notice) {
      return res.status(404).json({
        error: "Notice not found",
      });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update notice",
    });
  }
});

// Delete a notice - Admin only
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        error: "Notice not found",
      });
    }

    res.json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete notice",
    });
  }
});

module.exports = router;