const aiService = require('../utils/ai/ai.service');

class AIController {
  async generateRoadmap(req, res, next) {
    try {
      const { domain, role, level } = req.body;
      const data = await aiService.generateLearningRoadmap(req.user ? req.user.id : 'anonymous', domain, role, level);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async evaluateProject(req, res, next) {
    try {
      const { projectTitle, requirements, codeRepoUrl, liveUrl } = req.body;
      const data = await aiService.evaluateProject(req.user ? req.user.id : 'anonymous', projectTitle, requirements, codeRepoUrl, liveUrl);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AIController();
