// ============================================================
// SMALL Express + EJS (template engine) demonstration.
// This is SEPARATE from the main React website, exactly as the
// syllabus requires - the main site stays in React.
//
//   cd ejs-demo
//   npm install
//   npm start        -> open http://localhost:4000
// ============================================================
const express = require("express");
const app = express();

// Tell Express to render .ejs files from the "views" folder
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Static files (CSS) from the "public" folder
app.use(express.static("public"));

// GET / -> server renders an HTML page on the SERVER (template engine)
app.get("/", (req, res) => {
  const data = {
    college: "D. Y. Patil College of Engineering and Technology, Kolhapur",
    department: "Computer Science and Engineering",
    years: ["FE", "SE", "TE", "BE"],
    student: { name: "Sample Student", branch: "CSE" },
  };
  // res.render() combines data + template on the server, then sends HTML
  res.render("index", data);
});

// A route that shows how a query parameter changes the rendered output
app.get("/greet", (req, res) => {
  res.render("greet", { name: req.query.name || "Visitor" });
});

app.listen(4000, () => {
  console.log("EJS demo running on http://localhost:4000");
});
