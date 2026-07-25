const Joi = require('joi');

const createSchema = {
  body: Joi.object().keys({
    student: Joi.string().required(),
    company: Joi.string().required(),
    jobPost: Joi.string().allow('', null),
    status: Joi.string().valid('interviewing', 'offered', 'hired', 'rejected')
  })
};

const updateSchema = {
  body: Joi.object().keys({
    status: Joi.string().valid('interviewing', 'offered', 'hired', 'rejected')
  })
};

module.exports = {
  createSchema,
  updateSchema
};
