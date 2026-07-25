const Joi = require('joi');

const generateRoadmap = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
    role: Joi.string().required(),
    level: Joi.string().valid('Junior', 'Intermediate', 'Senior').default('Junior')
  })
};

const evaluateProject = {
  body: Joi.object().keys({
    projectTitle: Joi.string().required(),
    requirements: Joi.string().required(),
    codeRepoUrl: Joi.string().uri().required(),
    liveUrl: Joi.string().uri().required()
  })
};

module.exports = {
  generateRoadmap,
  evaluateProject
};
