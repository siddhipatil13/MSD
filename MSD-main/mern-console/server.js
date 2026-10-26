const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let students = [];


// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});


// Add student
app.post("/students", (req, res) => {

    const student = {
        id: Date.now(),
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    students.push(student);

    res.json({
        message: "Student added successfully",
        student: student
    });
});


// Delete student
app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    students = students.filter(student => student.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});


app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});