const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const { UNAUTHORIZED } = require("../utils/errors");

module.exports.handleAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization Required" });
  }

  req.user = paylaod;

  next();
};
