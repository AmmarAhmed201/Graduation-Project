const mongoose = require("mongoose");
const Joi = require("joi");

const Trip = mongoose.model(
  "Trip",
  new mongoose.Schema({
    destination: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true }
  })
);
function validateTrip(trip) {
  const schema = {
    destination: Joi.string()
      .min(3)
      .required(),
    location: Joi.string()
      .min(3)
      .required(),
    duration: Joi.number().required()
  };
  return Joi.validate(trip, schema);
}

module.exports.Trip = Trip;
module.exports.validateTrip = validateTrip;
