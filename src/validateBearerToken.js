const { API_KEY } = require("./config");

function validateBearerToken(req, res, next) {
  const bearerToken = req.get("Authorization");

  if (!bearerToken || bearerToken.split(" ")[1] !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
}

module.exports = validateBearerToken;
