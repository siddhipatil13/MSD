// ============================================================
// SEED SCRIPT - inserts sample data so the website shows
// content immediately after setup.
// Run with:  npm run seed
// ============================================================
require("dotenv").config();
const mongoose = require("mongoose");

const Faculty = require("./models/Faculty");
const Announcement = require("./models/Announcement");
const Project = require("./models/Project");

const faculty = [
  {
    name: "Dr. Sample Patil",
    designation: "Professor and Head",
    qualification: "Ph.D. in Computer Science",
    expertise: "Machine Learning, Data Science",
    email: "head.cse@example.college",
    isSample: true,
  },
  {
    name: "Prof. Sample Deshmukh",
    designation: "Associate Professor",
    qualification: "M.E. (Computer Engineering)",
    expertise: "Database Systems, Web Technologies",
    email: "deshmukh@example.college",
    isSample: true,
  },
  {
    name: "Prof. Sample Jadhav",
    designation: "Assistant Professor",
    qualification: "M.Tech (Computer Science)",
    expertise: "Operating Systems, Computer Networks",
    email: "jadhav@example.college",
    isSample: true,
  },
  {
    name: "Prof. Sample Kulkarni",
    designation: "Assistant Professor",
    qualification: "M.E. (Software Engineering)",
    expertise: "Software Engineering, Cloud Computing",
    email: "kulkarni@example.college",
    isSample: true,
  },
];

const announcements = [
  {
    title: "National Conference on Emerging Technologies",
    description:
      "The CSE department is organising a one-day national conference. Registration is open for students and faculty.",
    category: "Event",
    venue: "College Auditorium",
    date: new Date(),
  },
  {
    title: "Workshop on Full-Stack Development with MERN",
    description:
      "A hands-on workshop covering MongoDB, Express.js, React and Node.js. Bring your laptops.",
    category: "Workshop",
    venue: "Lab 3, CSE Department",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Inter-College Coding Competition",
    description:
      "Team coding contest with problems on arrays, strings and basic algorithms. Open to SE and TE students.",
    category: "Competition",
    venue: "Computer Centre",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Placement Drive - Notice for BE Students",
    description:
      "Company name withheld for demo purposes. Eligible BE students should register with the training and placement cell.",
    category: "Notice",
    venue: "Training and Placement Hall",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
  },
];

const projects = [
  {
    title: "Student Management System",
    description:
      "A web application to manage student admissions, attendance and marks with role-based login.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    year: "TE",
    studentName: "Sample Student A",
  },
  {
    title: "Library Management System",
    description:
      "Track book inventory, issue and return books, calculate fines and generate due-date reports.",
    technologies: ["React", "Express", "MongoDB", "JWT"],
    year: "BE",
    studentName: "Sample Student B",
  },
  {
    title: "College Event Portal",
    description:
      "Portal for students to view upcoming events, register online and receive notifications.",
    technologies: ["React", "Node.js", "Socket.io"],
    year: "SE",
    studentName: "Sample Student C",
  },
  {
    title: "Quiz App for Programming Fundamentals",
    description:
      "Timed multiple-choice quiz application for FE students with instant scoring.",
    technologies: ["HTML", "CSS", "JavaScript"],
    year: "FE",
    studentName: "Sample Student D",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear old data first so running seed twice does not duplicate records
    await Promise.all([
      Faculty.deleteMany({}),
      Announcement.deleteMany({}),
      Project.deleteMany({}),
    ]);

    await Faculty.insertMany(faculty);
    await Announcement.insertMany(announcements);
    await Project.insertMany(projects);

    console.log("Seed data inserted successfully!");
    console.log(
      `Faculty: ${faculty.length}, Announcements: ${announcements.length}, Projects: ${projects.length}`
    );
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
