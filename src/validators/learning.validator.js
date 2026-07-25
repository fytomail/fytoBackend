const Joi = require('joi');

const createSchema = {
  body: Joi.object().keys({})
};

const updateSchema = {
  body: Joi.object().keys({})
};

module.exports = {
  createSchema,
  updateSchema
};
