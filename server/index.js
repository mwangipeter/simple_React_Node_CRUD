//Creating variables for the various packages that will be used in this API.
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'students',
});

//Calling the various packages and using them with Express.
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//The APIs will now go here.
//The Insert API
app.post("/api/insert", (req, res) => {
    const regNumber = req.body.regNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const course = req.body.course;
    const email = req.body.email;
    const dob = req.body.dob;

    //MySql Query to insert data into the database.
    const insertQuery = "INSERT INTO student_data (regNumber,firstName,lastName,email,course,dob) VALUES (?,?,?,?,?,?)";
    db.query(insertQuery, [regNumber,firstName,lastName,email,course,dob], (err, result) => {
        console.log(err);
    });
});

//The API for pulling data from the database.
app.get("/api/select", (req, res) => {
    const selectQuery = "SELECT * FROM student_data";
    db.query(selectQuery, (err, result) => {
        res.send(result);
    });
});

//API Call to Update the Student Data.
app.get("/api/update/:id", (req, res) => {
    const studId = req.params.id;
    const selectQuery = "SELECT * FROM student_data where id = ? ";
    db.query(selectQuery, studId, (err, result) => {
        res.send(result);
    });
});
//API for deleting a Student.
app.delete("/api/delete/:id", (req, res) => {
    const student =  req.params.id;

    const deleteQuery = "DELETE FROM student_data where id = ? ";
    db.query(deleteQuery, student, (err, result) => {
        //
        if(err) console.log(err);
    });
});

//API for updating Data.
app.put("/api/student/update", (req, res) => {
    const newRegNumber = req.body.regNumber;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newCourse = req.body.course;
    const newEmail = req.body.email;
    const newDob = req.body.dob;
    const id = req.body.id;
    //MySql Query to insert data into the database.
    const updateQuery = "UPDATE student_data SET regNumber = ?,firstName = ? ,lastName = ?,course = ?,email = ?,dob = ? WHERE id = ?";
    db.query(updateQuery, [newRegNumber,newFirstName,newLastName,newCourse,newEmail,newDob, id], (err, result) => {
        console.log(err);
    });
});
//Setting a port for the Server to run on.
app.listen(3002, (req, res) => {
    
})