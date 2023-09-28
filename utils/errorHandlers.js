const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const handleUserHttpError = (req, res, err) => {
  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST)
      .send({ message: "Information is missing or in incorrect format" });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "Id is in incorrect format" });
  } else if (err.name === "DocumentNotFoundError") {
    res
      .status(NOT_FOUND)
      .send({ message: `User ${req.params.userId} not found` });
  } else {
    res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server." });
  }
};

const handleItemHttpError = (req, res, err) => {
  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST)
      .send({ message: "Information is missing or in incorrect format" });
  } else if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "Id is in incorrect format" });
  } else if (err.name === "DocumentNotFoundError") {
    res
      .status(NOT_FOUND)
      .send({ message: `Item ${req.params.itemId} not found` });
  } else {
    res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server." });
  }
};

module.exports = {
  handleUserHttpError,
  handleItemHttpError,
};
