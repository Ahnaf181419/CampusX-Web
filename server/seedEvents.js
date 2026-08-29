require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");

const events = [
  {
    title: "Annual Tech Fest 2026",
    date: "May 10, 2026",
    time: "10:00 AM – 6:00 PM",
    location: "Main Auditorium",
    description:
      "The biggest tech event of the year featuring workshops, hackathons, guest speakers from top tech companies, and hands-on demo booths. Open to all departments.",
    status: "Ongoing",
    link: "#",
  },
  {
    title: "Career Fair – Spring Semester",
    date: "May 5, 2026",
    time: "9:00 AM – 3:00 PM",
    location: "Convention Hall",
    description:
      "Meet recruiters from 30+ companies offering internships and full-time roles. Bring your resume and portfolio.",
    status: "Ongoing",
    link: "#",
  },
  {
    title: "Blood Donation Drive",
    date: "Apr 28, 2026",
    time: "11:00 AM – 4:00 PM",
    location: "Student Center, Room 204",
    description:
      "Organized by the Red Cross Society. All donors receive a certificate and a free health check-up.",
    status: "Completed",
    link: null,
  },
  {
    title: "Workshop: Intro to Machine Learning",
    date: "Apr 20, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "CS Building, Lab 3",
    description:
      "A beginner-friendly workshop covering the basics of ML, regression models, and hands-on Python exercises.",
    status: "Completed",
    link: null,
  },
  {
    title: "Inter-Department Cricket Tournament",
    date: "May 15, 2026",
    time: "3:00 PM – 7:00 PM",
    location: "University Sports Complex",
    description:
      "Round-robin matches between department teams. Cheer for your department and enjoy the finals with prizes.",
    status: "Upcoming",
    link: "#",
  },
  {
    title: "Seminar: Cloud Computing & DevOps",
    date: "May 20, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Seminar Hall B",
    description:
      "Industry experts from AWS and Google Cloud discuss modern cloud architectures and CI/CD pipelines.",
    status: "Upcoming",
    link: "#",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log("Connected to MongoDB");

  for (let i = 0; i < events.length; i++) {
    const { title, ...rest } = events[i];
    await Event.updateOne(
      { title },
      { $set: { ...rest, order: i } },
      { upsert: true }
    );
  }

  console.log(`Seeded ${events.length} events`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
