/*const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "TParduino"
});
connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE TParduino", function(err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
*/
/*app.get('/', function(req,res){

})*/

//app.listen(1337);

const express = require("express");
const app = express();
const mysql = require("mysql");
const http = require("http");
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"));

const connection = mysql.createPool({
  //para que el servidor maneje 50 queries por segundo
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "tparduino"
});

/*connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});*/

app.get("/", async function(req, res) {
  connection.getConnection(function(error, tempCont) {
    if (!!error) {
      tempCont.release();
      console.log("error");
    } else {
      console.log("conected");
      tempCont.query("select * from sensores", function(error, rows, fields) {
        tempCont.release();
        if (!!error) console.log("error in the query");
        else {
          console.log("success");
          //console.log(JSON.stringify(res.json(rows)));
          //console.log(res.body.json(rows));
          res.json(rows);
        }
      });
    }
  });
});

server.listen(1337, () => {
  console.log("server on port ", 1337);
});

/*import { Connection } from "./index";
export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * from sensores", (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
*/
