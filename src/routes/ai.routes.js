const express = require('express');
const aiController = require('../controllers/ai.controller');
const aiValidation = require('../validators/ai.validator');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = Router = express.Router();

router.use(authenticate);

router.post('/roadmap', validate(aiValidation.generateRoadmap), aiController.generateRoadmap);
router.post('/evaluate', validate(aiValidation.evaluateProject), aiController.evaluateProject);

module.exports = router;
