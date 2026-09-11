const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middleware/authMiddleware");

router.get("/test", isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin!",
    user: req.user,
  });
});

module.exports = router;