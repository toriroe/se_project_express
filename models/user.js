const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 2,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
