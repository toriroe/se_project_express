const jwt = require("jsonwebtoken");

const { JWT_SECRET = "SECRET_KEY" } = process.env;
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports.handleAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization Required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Invalid Token"));
  }

  req.user = payload;

  return next();
};
