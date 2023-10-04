const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { CREATED, DUPLICATE_EMAIL, UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const { handleHttpError } = require("../utils/errorHandlers");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email }).then((emailFound) => {
    if (emailFound) {
      res.status(DUPLICATE_EMAIL).send({ message: "Email already exists" });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        User.create({ name, avatar, email, password: hash })
          .then((user) => {
            res.status(CREATED).send({ data: user });
          })
          .catch((err) => {
            console.error(err, "error from createUser");
            handleHttpError(req, res, err);
          });
      });
    }
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = { createUser, getUsers, getUser, login };
