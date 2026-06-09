const jwt = require("jsonwebtoken");
const appConfig = require("../Config/app.config");

const signToken = (payload) =>
  jwt.sign(payload, appConfig.jwtSecret, {
    expiresIn: appConfig.jwtExpiresIn,
  });

module.exports = { signToken };
