const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const PasswordComplexity = require("joi-password-complexity");

const passengerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    //added unique
    unique: true
  },

  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now
  }
});
// generate web token and set an expiry date.
passengerSchema.methods.generateToken = function(expiry) {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey"),
    { expiresIn: expiry }
  );
};

const Passenger = mongoose.model("Passenger", passengerSchema);

function validatePassenger(passenger) {
  //validate Password
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 2
  };

  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions).required()
  };
  return Joi.validate(passenger, schema);
}

function validatePassengerLogin(passengerRequest) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(passengerRequest, schema);
}

module.exports.Passenger = Passenger;
module.exports.validatePassenger = validatePassenger;
module.exports.validatePassengerLogin = validatePassengerLogin;
