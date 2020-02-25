const mongoose = require("mongoose");

// Lines Model
const lineSchema = new mongoose.Schema({
    id: {type: Number},
    from: {type: String},
    to: {type: String},
    direction: {type: Boolean},
    cost: {type: Number},
    stations:[{type: String}]
});
const Lines = mongoose.model("Lines", lineSchema);

module.exports.Lines = Lines;
