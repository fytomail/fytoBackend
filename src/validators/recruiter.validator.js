const Joi = require('joi');

const createSchema = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    company: Joi.string().allow('', null),
    title: Joi.string().allow('', null)
  })
};

const updateSchema = {
  body: Joi.object().keys({
    company: Joi.string(),
    title: Joi.string()
  })
};

module.exports = {
  createSchema,
  updateSchema
};
