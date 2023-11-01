const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { handleHttpError } = require("../utils/errorHandlers");

const {
  CREATED,
  DUPLICATE_EMAIL,
  UNAUTHORIZED,
  NOT_FOUND,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        res.status(DUPLICATE_EMAIL).send({ message: "Email already exists" });
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          User.create({ name, avatar, email, password: hash })
            .then((user) => {
              const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
                expiresIn: "7d",
              });
              res
                .status(CREATED)
                .send({ name, avatar, email, _id: user._id, token });
            })
            .catch((err) => {
              console.error(err, "error from createUser");
              handleHttpError(req, res, err);
            });
        });
      }
    })
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
      res.send({ user, token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
