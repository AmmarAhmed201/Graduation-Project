const config = require("config");

module.exports = function() {
  // if "jwtPrivateKey" is not defined exit the program.
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  // Determine PORT
  const port = process.env.PORT || config.get("port");

  // get connection string from the config file
  const dbHost = config.get("dbConfig.host");
  const dbUser = config.get("dbConfig.user");
  const dbPass = config.get("dbConfig.password");
  const dbName = config.get("dbConfig.name");

  const connectionString = `${dbHost}://${dbUser}:
    ${dbPass}@claxdb-g26dp.gcp.mongodb.net/
    ${dbName}?retryWrites=true&w=majority`;

  return [connectionString, port];
};
