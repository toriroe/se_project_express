const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// validate clothing item body when an item is created
const validateItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

// validate user info body when a user is created
const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
    }),
  }),
});

// validate authentication when a user logs in
const validateLoginAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
    }),
  }),
});

// validate user and clothing item IDs when they are accessed
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24);
  }),
});

// validate URLs for avatars and item images
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports = {
  validateItemBody,
  validateUserInfoBody,
  validateLoginAuthentication,
  validateId,
  validateUrl,
};
