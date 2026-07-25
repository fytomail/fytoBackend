const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const keys = ['params', 'query', 'body'];
  const validSchema = {};

  keys.forEach((key) => {
    if (schema[key]) {
      validSchema[key] = schema[key];
    }
  });

  const object = {};
  keys.forEach((key) => {
    if (req[key]) {
      object[key] = req[key];
    }
  });

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false, allowUnknown: true })
    .validate(object);

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    const apiError = new ApiError(400, errorMessage);
    apiError.errors = errorDetails;
    return next(apiError);
  }

  keys.forEach((key) => {
    if (value[key]) {
      req[key] = value[key];
    }
  });

  return next();
};

module.exports = validate;
