const User = require("../models/user");
const { OK, CREATED } = require("../utils/errors");

const { handleUserHttpError } = require("../utils/errorHandlers");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      handleUserHttpError(req, res, err);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      handleUserHttpError(req, res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      handleUserHttpError(req, res, err);
    });
};

module.exports = { createUser, getUsers, getUser };
