const http = require("http");
const url = require("url");
const mysql = require("mysql");
const dbconfig = require("./dbconfig.js");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const con = mysql.createConnection(dbconfig);

const hostname = "134.209.96.147";
const port = 8080;

app.get("/data", (req, res) => {
  const sql =
    "SELECT id, fname, lname, batch, DATE_FORMAT(birthday, '%d/%m/%Y') as birthday FROM students";
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    res.json({ data: result });
    console.log("Student list requested");
  });
});

app.post("/addStudent", (req, res) => {
  if (
    req.query.fname.toString().match(/[^a-zA-Z]/g) ||
    req.query.lname.toString().match(/[^a-zA-Z]/g) ||
    req.query.batch.toString().match(/[^0-9]/g) ||
    req.query.birthday.toString().match(/[^0-9/]/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request", addStatus: false });
  } else if (req.query.birthday.length != 10) {
    res.status(400);
    res.json({ message: "Bad Request", addStatus: false });
  } else {
    const birthday = req.query.birthday.toString().split("/");
    const day = birthday[0];
    const month = birthday[1];
    const year = birthday[2];

    if (day.length != 2 || month.length != 2 || year.length != 4) {
      res.status(400);
      res.json({ message: "Wrong birthday format ", addStatus: false });
    } else if (
      day.toString().match(/[^0-9]/g) ||
      month.toString().match(/[^0-9]/g) ||
      year.toString().match(/[^0-9]/g)
    ) {
      res.status(400);
      res.json({ message: "Wrong birthday format", addStatus: false });
    } else if (day > 31 || day <= 0) {
      res.status(400);
      res.json({ message: "Wrong day format", addStatus: false });
    } else if (month > 12 || month <= 0) {
      res.status(400);
      res.json({ message: "Wrong month format", addStatus: false });
    } else {
      const sql =
        "INSERT INTO students (fname, lname, batch, birthday) VALUES (?, ?, ?, ?)";
      con.query(
        sql,
        [
          req.query.fname,
          req.query.lname,
          req.query.batch,
          year + "/" + month + "/" + day
        ],
        function(err, result, fields) {
          if (err) {
            res.json({ addStatus: false });
          }
          res.json({ addStatus: true });
        }
      );
      console.log("Student added");
    }
  }
});

app.delete("/deleteStudent/:id", (req, res) => {
  if (req.params.id.toString().match(/[^0-9]/g)) {
    res.status(400);
    res.json({ message: "Bad Request", addStatus: false });
  } else {
    const sql = "DELETE FROM students WHERE id = ?";
    con.query(sql, [req.params.id], function(err, result, fields) {
      if (err) {
        res.json({ deleteStatus: false });
      }
      res.json({ deleteStatus: true });
    });
    console.log(`Student id: ${req.params.id} deleted`);
  }
});

app.get("*", function(req, res) {
  res.send("Sorry, this is an invalid URL.");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
