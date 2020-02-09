const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function(connString) {
  // connect to the Data Base
  mongoose
    .connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to MongoDB...."));

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};
