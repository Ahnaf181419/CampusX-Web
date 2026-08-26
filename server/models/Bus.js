const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
  },
  busTitle: {
    type: String,
    required: true,
  },
  routeDirection: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  stops: [
    {
      name: { type: String, required: true },
      minutes: { type: Number, required: true },
    },
  ],
  isRunning: {
    type: Boolean,
    default: false,
  },
  currentStopIndex: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bus", busSchema);
