const express = require("express");
const socketIo = require("socket.io");
//la biblioteca necesita http
const http = require("http");
const app = express();
//hay que pasarle el modulo del servidor, que lo tiene app
const server = http.createServer(app);
//listen  es un modulo del socket que le pasas un servidor para que escuche ahi
const io = socketIo.listen(server);

app.use(express.static(__dirname + "/public"));

server.listen(3030, () => {
  console.log("server on port ", 3030);
});

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM4", { baudRate: 9600 });
//const parser = port.pipe(new Readline({ delimiter: "\n" }));
var parser = new Readline();
port.pipe(parser);

// Read the port data
parser.on("open", () => {
  console.log("serial port open");
});
parser.on("data", data => {
  //console.log(JSON.parse(data).Temperatura);
  //console.log(JSON.parse(data).Humedad);
  console.log(JSON.parse(data).Viento);
  io.emit("arduinodata", JSON.parse(data));
});

port.on("err", function(err) {
  console.log(err.message);
});
