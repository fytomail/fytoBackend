const Joi = require('joi');

const createProfile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().allow('', null),
    bio: Joi.string().allow('', null),
    avatar: Joi.string().allow('', null),
    domain: Joi.string().allow('', null),
    role: Joi.string().allow('', null),
    skills: Joi.array().items(Joi.string()).default([]),
    interests: Joi.array().items(Joi.string()).default([])
  })
};

const updateProfile = {
  body: Joi.object().keys({
    name: Joi.string(),
    phone: Joi.string().allow('', null),
    bio: Joi.string().allow('', null),
    avatar: Joi.string().allow('', null),
    domain: Joi.string().allow('', null),
    role: Joi.string().allow('', null),
    skills: Joi.array().items(Joi.string()),
    interests: Joi.array().items(Joi.string())
  })
};

module.exports = {
  createProfile,
  updateProfile
};
