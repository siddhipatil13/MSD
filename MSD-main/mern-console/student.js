const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let students = [];

function menu() {
    console.log("\n===== STUDENT MANAGEMENT SYSTEM =====");
    console.log("1. Add Student");
    console.log("2. View Students");
    console.log("3. Search Student");
    console.log("4. Delete Student");
    console.log("5. Exit");

    rl.question("Enter your choice: ", function(choice) {

        if (choice === "1") {
            addStudent();
        } 
        else if (choice === "2") {
            viewStudents();
        } 
        else if (choice === "3") {
            searchStudent();
        } 
        else if (choice === "4") {
            deleteStudent();
        } 
        else if (choice === "5") {
            console.log("Program ended.");
            rl.close();
        } 
        else {
            console.log("Invalid choice!");
            menu();
        }
    });
}


function addStudent() {

    rl.question("Enter student name: ", function(name) {

        rl.question("Enter age: ", function(age) {

            rl.question("Enter course: ", function(course) {

                const student = {
                    name: name,
                    age: Number(age),
                    course: course
                };

                students.push(student);

                console.log("\nStudent added successfully!");

                menu();
            });
        });
    });
}


function viewStudents() {

    console.log("\n===== STUDENTS =====");

    if (students.length === 0) {
        console.log("No students found.");
    } 
    else {

        for (let i = 0; i < students.length; i++) {

            console.log(
                `${i + 1}. ${students[i].name} | Age: ${students[i].age} | Course: ${students[i].course}`
            );
        }
    }

    menu();
}


function searchStudent() {

    rl.question("Enter student name: ", function(name) {

        let found = false;

        for (let student of students) {

            if (student.name.toLowerCase() === name.toLowerCase()) {

                console.log("\nStudent found!");
                console.log("Name:", student.name);
                console.log("Age:", student.age);
                console.log("Course:", student.course);

                found = true;
            }
        }

        if (!found) {
            console.log("Student not found.");
        }

        menu();
    });
}


function deleteStudent() {

    rl.question("Enter student name to delete: ", function(name) {

        let index = -1;

        for (let i = 0; i < students.length; i++) {

            if (students[i].name.toLowerCase() === name.toLowerCase()) {
                index = i;
                break;
            }
        }

        if (index !== -1) {

            students.splice(index, 1);

            console.log("Student deleted successfully!");

        } else {

            console.log("Student not found.");
        }

        menu();
    });
}


// Start program
menu();