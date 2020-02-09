const express = require("express");
const trips = require("../routes/trips");
const error = require("../middlewares/error");
const passengers = require("../routes/passengers");
const passengersLogin = require("../routes/passengerLogin");
const morgan = require("morgan");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //app.use(express.static("public"));
  app.use(morgan("tiny"));
  app.use("/api/trips", trips);
  app.use("/api/passengers", passengers);
  app.use("/api/login", passengersLogin);
  app.use(error);
};
