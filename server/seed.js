// One-time (and re-runnable) database seeder for the bus collection.
// Upserts keyed on busId: on re-run it refreshes the route catalog
// (title, stops...) but NEVER touches live position (isRunning,
// currentStopIndex) — those are $setOnInsert, so existing documents
// keep whatever position the admin last set.
require("dotenv").config();
const mongoose = require("mongoose");
const Bus = require("./models/Bus");

const buses = [
  {
    busId: "padma",
    busTitle: "Padma Bus",
    routeDirection: "To University",
    destination: "towards Bangla School",
    stops: [
      { name: "Mirpur 12", minutes: 0 },
      { name: "Mirpur 11.5", minutes: 3 },
      { name: "Purobi", minutes: 7 },
      { name: "Bangla School", minutes: 13 },
      { name: "Mirpur 11", minutes: 18 },
      { name: "Mirpur 10", minutes: 23 },
      { name: "Kazipara", minutes: 27 },
      { name: "Shewrapara", minutes: 30 },
      { name: "Taltola", minutes: 35 },
      { name: "Agargaon", minutes: 38 },
      { name: "University", minutes: 46 },
    ],
  },
  {
    busId: "meghna",
    busTitle: "Meghna Bus",
    routeDirection: "To University",
    destination: "towards Uttara",
    stops: [
      { name: "Proshika Bhaban", minutes: 0 },
      { name: "Sheyalbari More", minutes: 5 },
      { name: "Rynkhola", minutes: 10 },
      { name: "Sony Cinema hall", minutes: 15 },
      { name: "Mirpur 1", minutes: 22 },
      { name: "Ansarcamp", minutes: 26 },
      { name: "Tolarbag", minutes: 28 },
      { name: "Technical More", minutes: 32 },
      { name: "Kallyanpur", minutes: 36 },
      { name: "Shyamoli", minutes: 40 },
      { name: "Asadgate", minutes: 46 },
      { name: "Manik Mia Avenue", minutes: 48 },
      { name: "Rangs Bhaban", minutes: 52 },
      { name: "University", minutes: 56 },
    ],
  },
  {
    busId: "karnaphuli",
    busTitle: "Karnaphuli Bus",
    routeDirection: "To University",
    destination: "towards Dhanmondi",
    stops: [
      { name: "Chashara", minutes: 0 },
      { name: "Signboad", minutes: 4 },
      { name: "Jatrabari", minutes: 9 },
      { name: "Khilgaon", minutes: 14 },
      { name: "Malibagh", minutes: 19 },
      { name: "Mogbazar", minutes: 25 },
      { name: "University", minutes: 44 },
    ],
  },
  {
    busId: "surma",
    busTitle: "Surma Bus",
    routeDirection: "To University",
    destination: "towards Gulshan",
    stops: [
      { name: "Gulshan 2", minutes: 0 },
      { name: "Gulshan 1", minutes: 6 },
      { name: "Mohakhali", minutes: 14 },
      { name: "Moghbazar", minutes: 20 },
      { name: "Malibagh", minutes: 26 },
      { name: "Kakrail", minutes: 31 },
      { name: "Shahbagh", minutes: 36 },
      { name: "University", minutes: 44 },
    ],
  },
  {
    busId: "jamuna",
    busTitle: "Jamuna Bus",
    routeDirection: "To University",
    destination: "towards Mohammadpur",
    stops: [
      { name: "Mohammadpur Town", minutes: 0 },
      { name: "Shyamoli", minutes: 7 },
      { name: "Asad Gate", minutes: 13 },
      { name: "Russell Square", minutes: 20 },
      { name: "Farmgate", minutes: 26 },
      { name: "Karwan Bazar", minutes: 32 },
      { name: "University", minutes: 40 },
    ],
  },
  {
    busId: "shitalakshya",
    busTitle: "Shitalakshya Bus",
    routeDirection: "To University",
    destination: "towards Uttara",
    stops: [
      { name: "Uttara Sector 7", minutes: 0 },
      { name: "Azampur", minutes: 8 },
      { name: "Uttara Center", minutes: 14 },
      { name: "Airport Road", minutes: 22 },
      { name: "Banani", minutes: 29 },
      { name: "Mohakhali", minutes: 36 },
      { name: "University", minutes: 45 },
    ],
  },
  {
    busId: "buriganga",
    busTitle: "Buriganga Bus",
    routeDirection: "To University",
    destination: "towards Old Dhaka",
    stops: [
      { name: "Gulistan", minutes: 0 },
      { name: "Nayabazar", minutes: 6 },
      { name: "Zigatola", minutes: 12 },
      { name: "Dhanmondi 2", minutes: 18 },
      { name: "Kalabagan", minutes: 24 },
      { name: "Green Road", minutes: 30 },
      { name: "University", minutes: 40 },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log("Connected to MongoDB");

  for (let i = 0; i < buses.length; i++) {
    const { busId, ...catalog } = buses[i];
    await Bus.updateOne(
      { busId },
      {
        $set: { ...catalog, order: i },
        $setOnInsert: { isRunning: false, currentStopIndex: 0 },
      },
      { upsert: true }
    );
  }

  console.log(`Seeded ${buses.length} buses`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
