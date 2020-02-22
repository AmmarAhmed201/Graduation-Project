const mongoose = require("mongoose");

// Lines Model
const lineSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    to: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    direction: {
        type: Boolean,
        default: true
    },
    cost: {
        type: Number,
        required: true
    },
    _stations: [{type: mongoose.ObjectId, ref: 'Stations'}]
});


////****************** Lines Validation  ******************
// Set Validation Schema
const validationSchema = Joi.object().keys({
    from: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(30),
    to: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(30),
    direction: Joi.boolean()
    .required(),
    cost: Joi.number().
    required(),
    _stations: Joi.array().items(Joi.objectId())
});
const validateLine = function(line){
    return validationSchema.validate(line);
}

module.exports.Lines = mongoose.model("Lines", lineSchema);
module.exports.validateLine = validateLine;