require("dotenv").config();
const mongoose = require("mongoose");
const LostFound = require("./models/LostFound");

const items = [
  {
    title: "Blue Backpack",
    type: "Lost",
    location: "Library 2nd Floor",
    date: "May 10, 2026",
    description: "Blue JanSport backpack with laptop compartment. Contains a MacBook Pro, notebook, and water bottle. Lost near the study tables.",
    contact: "john.doe@university.edu",
  },
  {
    title: "iPhone 15 Pro",
    type: "Lost",
    location: "Cafeteria",
    date: "May 8, 2026",
    description: "Black iPhone 15 Pro in a clear case. Lost during lunch break. Has a cracked screen protector.",
    contact: "+1-555-0123",
  },
  {
    title: "Set of Car Keys",
    type: "Found",
    location: "Parking Lot B",
    date: "May 12, 2026",
    description: "Found a set of car keys with a Toyota key fob and a few other keys on a black lanyard. Turned in to security office.",
    contact: "security@university.edu",
  },
  {
    title: "Red Umbrella",
    type: "Lost",
    location: "Main Entrance",
    date: "May 5, 2026",
    description: "Compact red umbrella with wooden handle. Left it by the entrance during the rain.",
    contact: "jane.smith@university.edu",
  },
  {
    title: "Wireless Earbuds Case",
    type: "Found",
    location: "CS Building Lab 3",
    date: "May 11, 2026",
    description: "White AirPods Pro case (earbuds inside). Found on the desk in Lab 3. Available for pickup at CS department office.",
    contact: "cs.dept@university.edu",
  },
  {
    title: "Student ID Card",
    type: "Found",
    location: "Student Center",
    date: "May 9, 2026",
    description: "Found a student ID card near the vending machines. Name: Alex Johnson, ID: 2024-12345. Held at Student Center front desk.",
    contact: "student.center@university.edu",
  },
  {
    title: "Gray Hoodie",
    type: "Lost",
    location: "Gym",
    date: "May 7, 2026",
    description: "Nike gray hoodie, size M. Left in the locker room after workout. Has a small tear on the left sleeve.",
    contact: "mike.wilson@university.edu",
  },
  {
    title: "Textbook: Calculus Early Transcendentals",
    type: "Lost",
    location: "Math Building Room 201",
    date: "May 6, 2026",
    description: "Stewart Calculus 8th edition. Hardcover with yellow sticky notes throughout. Left on the desk after class.",
    contact: "sarah.chen@university.edu",
  },
  {
    title: "Water Bottle (Hydro Flask)",
    type: "Found",
    location: "Football Field",
    date: "May 13, 2026",
    description: "Stainless steel Hydro Flask, 32oz, matte black. Found on the bleachers after the match. No stickers.",
    contact: "athletics@university.edu",
  },
  {
    title: "Prescription Glasses",
    type: "Lost",
    location: "Lecture Hall A",
    date: "May 4, 2026",
    description: "Black rectangular frames, thin lenses. Left on the seat during the morning lecture. Very important - needed for driving.",
    contact: "david.kim@university.edu",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log("Connected to MongoDB");

  for (let i = 0; i < items.length; i++) {
    const { title, ...rest } = items[i];
    await LostFound.updateOne(
      { title },
      { $set: { ...rest, order: i } },
      { upsert: true }
    );
  }

  console.log(`Seeded ${items.length} lost/found items`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});