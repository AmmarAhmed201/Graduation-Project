// Modules
const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
// Includes
const jwtPassengerKey = require("../startup/config.js").jwtKeys().passengerJwt
const RegExps = require("./regExps")


//****************** Passenger Model ******************
// Schema
const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 64
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true,
    minlength: 6,
    maxlength: 64,
    match: RegExps.mailRegExp
  },
  mail_verified: {type: Boolean, default: false},
  pass: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 11,
    maxlength: 11,
    match: RegExps.phoneRegExp
  },
  phone_verified: {type: Boolean, default: false},
  tripsCount: {
    type: Number,
    validate: {
      validator: (c)=> {return Number.isInteger(c);},
      message: "tripsCount should be an integer"
    }
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    set: (r) => {return Math.round(r)},
    get: (r) => {return Math.round(r)}
  },
  balance: {type: Number},
  maxLoan: {type: Number},
  _currentTrip:{type: mongoose.ObjectId, ref: 'CurrentTrips'},
  _pastTrips: [{type: mongoose.ObjectId, ref: 'PastTrips'}],
  _offers: [{type: mongoose.ObjectId, ref: 'Offers'}],
  _complains: [{type: mongoose.ObjectId, ref: 'Complains'}]
});

// JWT generation method
passengerSchema.methods.generateToken = function(expiry) {
  return jwt.sign(
    { _id: this._id},
    jwtPassengerKey,
    { expiresIn: expiry }
  );
};

// Model
const Passengers = mongoose.model("Passengers", passengerSchema);


////****************** Passenger Validation  ******************
// Model Validation
function validatePassenger(passenger) {
  // Set Password Complexity
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 2
  };
  // Set Schema Validation
  const schema = {
    email: Joi.string()
      .min(5)
      .max(64)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions).required()
  };
  return Joi.validate(passenger, schema);
}

module.exports.Passengers = Passengers;