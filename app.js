const winston = require("winston");
const express = require("express");
const app = express();

const connectionString = require("./startup/config")()[0];
const port = require("./startup/config")()[1];
require("./startup/logging")(connectionString);
require("./startup/routes")(app);
require("./startup/db")(connectionString);

// Initiate the server on the selected PORT
app.listen(port, () => winston.info(`Listening on port ${port}`));

//const dotenv = require("dotenv");
// set environment variables
//dotenv.config();
