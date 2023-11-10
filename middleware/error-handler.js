const errorHandler = (err, req, res, next) => {
  console.error(err);
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  console.log(err.statusCode);
  // check the status and display a message based on it
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;
