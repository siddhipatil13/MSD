// Academic year content.
// Everything here is SAMPLE content (labelled in the UI) so you can edit it
// to match the official D. Y. Patil / SPPU curriculum later.

export const years = [
  { code: "FE", label: "First Year", full: "First Year Engineering (FE)" },
  { code: "SE", label: "Second Year", full: "Second Year Engineering (SE)" },
  { code: "TE", label: "Third Year", full: "Third Year Engineering (TE)" },
  { code: "BE", label: "Fourth Year", full: "Final Year Engineering (BE)" },
];

export const academicsData = {
  FE: {
    intro:
      "The first year builds strong foundations in programming and mathematics for every engineering branch.",
    subjects: [
      { code: "BSC-101", name: "Engineering Mathematics I", credits: 4 },
      { code: "BSC-102", name: "Engineering Physics", credits: 4 },
      { code: "BEC-101", name: "Basic Electronics", credits: 3 },
      { code: "BEC-103", name: "Programming and Problem Solving (C)", credits: 3 },
      { code: "BEC-104", name: "Computer Fundamentals and IT", credits: 2 },
      { code: "BEC-105", name: "Engineering Graphics and Design", credits: 3 },
    ],
    objectives: [
      "Understand variables, loops, functions and problem solving in C",
      "Apply basic mathematics to engineering problems",
      "Know computer organisation, memory and input/output devices",
      "Develop a logical approach to breaking down problems",
    ],
    ideas: [
      "Temperature converter (Celsius / Fahrenheit)",
      "Simple calculator using switch-case",
      "Pattern printing programs using nested loops",
      "Student grade report using arrays and functions",
    ],
  },
  SE: {
    intro:
      "The second year introduces core computer engineering subjects: data structures, OOP, databases and web development.",
    subjects: [
      { code: "CSE-201", name: "Data Structures and Algorithms", credits: 4 },
      { code: "CSE-202", name: "Object Oriented Programming (Java/C++)", credits: 4 },
      { code: "CSE-203", name: "Database Management Systems", credits: 4 },
      { code: "CSE-204", name: "Computer Organization and Architecture", credits: 3 },
      { code: "CSE-205", name: "Web Development", credits: 3 },
      { code: "CSE-206", name: "Discrete Mathematics", credits: 3 },
    ],
    objectives: [
      "Implement lists, stacks, queues, trees and graphs",
      "Design classes, objects, inheritance and polymorphism",
      "Write SQL queries and normalise database schemas",
      "Build responsive pages with HTML, CSS and JavaScript",
    ],
    ideas: [
      "Online quiz application",
      "Contact book with search and sort",
      "Hospital management database project",
      "Responsive college club website",
    ],
  },
  TE: {
    intro:
      "The third year focuses on systems, networking, software engineering and introductory AI/ML.",
    subjects: [
      { code: "CSE-301", name: "Operating Systems", credits: 4 },
      { code: "CSE-302", name: "Computer Networks", credits: 4 },
      { code: "CSE-303", name: "Software Engineering", credits: 4 },
      { code: "CSE-304", name: "Artificial Intelligence and Machine Learning", credits: 4 },
      { code: "CSE-305", name: "Automata Theory and Compiler Design", credits: 3 },
      { code: "CSE-306", name: "Mini Project", credits: 3 },
    ],
    objectives: [
      "Explain process scheduling, deadlock and memory management",
      "Describe the TCP/IP model and design simple networked applications",
      "Apply SDLC, testing and agile practices to a team project",
      "Train and evaluate a basic machine learning model",
    ],
    ideas: [
      "Student Management System (MERN)",
      "Network monitoring dashboard",
      "Bug tracking system with role-based login",
      "Movie recommendation using collaborative filtering",
    ],
  },
  BE: {
    intro:
      "The final year integrates learning through a major project, internships, electives and placement preparation.",
    subjects: [
      { code: "CSE-401", name: "Distributed Systems and Cloud Computing", credits: 4 },
      { code: "CSE-402", name: "Information Security", credits: 3 },
      { code: "CSE-403", name: "Elective I (Big Data / IoT / Deep Learning)", credits: 3 },
      { code: "CSE-404", name: "Elective II (DevOps / Blockchain / NLP)", credits: 3 },
      { code: "CSE-405", name: "Major Project and Seminar", credits: 6 },
      { code: "CSE-406", name: "Internship / Industrial Training", credits: 2 },
    ],
    objectives: [
      "Design, develop and document a complete working project",
      "Apply secure coding and cloud deployment practices",
      "Communicate technical work through a seminar and report",
      "Prepare for placements: aptitude, DSA and mock interviews",
    ],
    ideas: [
      "Library Management System with barcode tracking",
      "College Event Portal with online registration",
      "AI chatbot for departmental FAQs",
      "Cloud-based file storage with access control",
    ],
  },
};
