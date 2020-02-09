const jwt = require("jsonwebtoken");
const config = require("config");

function checkAdmin(req, res, next) {
  //if token isn't included in the header
  if (!req.passenger.isAdmin)
    return res.status(403).send("Access Forbidden. You are not authorized");

  next();
}
module.exports = checkAdmin;
