"use strict";

const express = require("express");
const cars = require("./cars");  
const app = express();

// Basic root route
app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

// JSON API route
app.get("/api", (request, response) => {
  response.send({
    data: {
      message: "Hello from Express!",
    },
  });
});

// Cars API route 
app.get("/api/cars", (request, response) => {
  response.send({ data: cars });
});

const PORT = 4000;
app.listen(PORT, (err) => {
  if (err) return console.error("An error occurred", err);
  console.log(`The server is listening on ${PORT}`);
});