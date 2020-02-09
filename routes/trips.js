const { Trip, validateTrip } = require("../models/trip");
const authorization = require("../middlewares/Authorization");
const admin = require("../middlewares/admin");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  const trips = await Trip.find();
  res.send(trips);
});

router.post("/", authorization, async (req, res) => {
  const { error } = validateTrip(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const trip = new Trip({
    destination: req.body.destination,
    location: req.body.location,
    duration: req.body.duration
  });
  await trip.save();
  res.send(trip);
});

router.put("/:id", authorization, async (req, res) => {
  try {
    const { error } = validateTrip(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidID) {
      return res.status(400).send("Invalid Trip ID.");
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      {
        destination: req.body.destination,
        location: req.body.location,
        duration: req.body.duration
      },
      { new: true }
    );
    if (!trip) {
      res.status(404).send("Trip not found");
    }

    res.send(trip);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", [authorization, admin], async (req, res) => {
  try {
    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidID) {
      return res.status(400).send("Invalid Trip ID.");
    }
    const trip = await Trip.findByIdAndRemove(req.params.id);

    if (!trip) {
      return res.status(404).send("Trip not found");
    }

    res.send(trip);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidID) {
      return res.status(400).send("Invalid Trip ID.");
    }
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).send("Trip not found");
    }
    res.send(trip);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
