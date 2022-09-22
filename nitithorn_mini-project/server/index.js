const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");



app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "emyployeesystem",
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM db_employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const age = req.body.age;
  const talant = req.body.talant;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO db_employees (name, lastname, age, talant, position, wage) VALUES (?,?,?,?,?,?)",
    [name, lastname, age, talant, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM db_employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});