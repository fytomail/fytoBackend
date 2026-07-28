const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    name: Joi.string().optional().allow(''),
    username: Joi.string().optional().allow(''),
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('student', 'company_hr', 'recruiter', 'admin').default('student'),
    phone: Joi.string().optional().allow(''),
    defaultPortal: Joi.string().optional()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().optional().allow(''),
    username: Joi.string().optional().allow(''),
    password: Joi.string().required()
  }).or('email', 'username')
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens
};
