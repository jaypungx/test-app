const http = require("http");
const url = require("url");
const mysql = require("mysql");
const sha256 = require("js-sha256");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:
    sha256.hmac(
      "a8cd72ee7348096b0cab6fe3d80bcf51b7b9ee48b44fa89f02378824f6383240",
      "71a4e8fdd9caa60a4aaa4735e7e363b1a4918c2daffbe5f161e57d0a75db0f77"
    ) + "Z+",
  database: "stuman"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

const hostname = "134.209.96.147";
const port = 8080;

const server = http.createServer((req, res) => {
  // Example route http://localhost:8080/?year=2017&month=July
  //   const q = url.parse(req.url, true).query;
  //   const txt = q.year + " " + q.month;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write(req.url);
  res.end("Hello World\n");

  //   const sql = "CREATE DATABASE stuman";
  //   con.query(sql, function(err, result) {
  //     if (err) throw err;
  //     console.log("students table created");
  //   });

  //   const sql =
  //     "CREATE TABLE students (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(30) NOT NULL, lname VARCHAR(30) NOT NULL, batch INT(2) NOT NULL, birthday DATE NOT NULL)";
  //   con.query(sql, function(err, result) {
  //     if (err) throw err;
  //     console.log("students table created");
  //   });

  //   const sql =
  //     "INSERT INTO students (fname, lname, batch, birthday) VALUES ('John', 'Doe', '5', '1991-12-01')";
  //   con.query(sql, function(err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //   });

  const sql = "SELECT * FROM students";
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
