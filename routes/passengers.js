const { Passenger, validatePassenger } = require("../models/passenger");
const authorization = require("../middlewares/Authorization");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/me", authorization, async (req, res) => {
  const passenger = await Passenger.findById(req.passenger._id).select(
    "-password"
  );
  res.send(passenger);
});
//rgister
router.post("/register", async (req, res) => {
  //check if the passenger information is valid.
  const { error } = validatePassenger(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user with the same email already registered.
  let passenger = await Passenger.findOne({ email: req.body.email });
  if (passenger) return res.status(400).send("email already exists.");

  //pick what you want to save in Database (using lodash).
  passenger = new Passenger(_.pick(req.body, ["email", "password"]));

  //add salt before the hashed password, then hash it.
  const salt = await bcrypt.genSalt(10);
  passenger.password = await bcrypt.hash(passenger.password, salt);

  //save user to the database.
  await passenger.save();

  //create web token and sends it to the user as an http header.
  const webToken = passenger.generateToken("5h");

  //pick what you want to send to the user (using lodash).
  res
    .header("x-login-token", webToken)
    .send(_.pick(passenger, ["_id", "email"]));
});

module.exports = router;
