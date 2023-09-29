const User = require("../models/user");
const { CREATED } = require("../utils/errors");

const { handleHttpError } = require("../utils/errorHandlers");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

module.exports = { createUser, getUsers, getUser };
