const express = require('express');
const router = express.Router();
const controller = require('../controllers/ai.controller');

router.post('/summary', controller.summary);
router.post('/ask', controller.ask);
router.post('/notes', controller.notes);
router.post('/explain-code', controller.explainCode);
router.post('/examples', controller.examples);
router.post('/hints', controller.hints);

module.exports = router;
