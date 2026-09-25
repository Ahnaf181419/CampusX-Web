const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Maintenance"],
    default: "Available",
  },
  nextAvailableTime: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);