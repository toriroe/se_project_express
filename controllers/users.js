const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET = "SECRET_KEY" } = process.env;

const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const BadRequestError = require("../errors/bad-request-error");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        throw new ConflictError("Email already exists");
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.create({ name, avatar, email, password: hash })
              .then((user) => {
                const token = jwt.sign(
                  { _id: user.id },
                  JWT_SECRET,

                  {
                    expiresIn: "7d",
                  },
                );
                res
                  .status(201)
                  .send({ name, avatar, email, _id: user._id, token });
              })
              .catch((err) => {
                if (err.name === "ValidationError") {
                  next(new BadRequestError("Validation Error"));
                } else {
                  next(err);
                }
              });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        name: user.name,
        avatar: user.avatar,
        email,
        _id: user.id,
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      next(new UnauthorizedError("Error from login"));
    });
};

const getCurrentUser = (req, res, next) => {
  // const { _id: userId } = req.user;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
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
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Error from updateUser"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
