require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("./models/Room");

const rooms = [
  {
    name: "Lecture Hall A",
    number: "LH-A-101",
    status: "Available",
    nextAvailableTime: "Now",
  },
  {
    name: "Seminar Hall B",
    number: "SH-B-201",
    status: "Occupied",
    nextAvailableTime: "2:00 PM",
  },
  {
    name: "Computer Lab 3",
    number: "CL-3-203",
    status: "Available",
    nextAvailableTime: "Now",
  },
  {
    name: "Tutorial Room 101",
    number: "TR-101-101",
    status: "Available",
    nextAvailableTime: "Now",
  },
  {
    name: "Conference Room",
    number: "CR-ADM-301",
    status: "Occupied",
    nextAvailableTime: "4:30 PM",
  },
  {
    name: "Physics Lab 2",
    number: "PL-2-102",
    status: "Maintenance",
    nextAvailableTime: "Tomorrow",
  },
  {
    name: "Auditorium",
    number: "AUD-CC-GF",
    status: "Available",
    nextAvailableTime: "Now",
  },
  {
    name: "Seminar Hall A",
    number: "SH-A-GF",
    status: "Available",
    nextAvailableTime: "Now",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log("Connected to MongoDB");

  // Clear existing rooms
  await Room.deleteMany({});
  console.log("Cleared existing rooms");

  for (let i = 0; i < rooms.length; i++) {
    await Room.create({ ...rooms[i], order: i });
  }

  console.log(`Seeded ${rooms.length} rooms`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});