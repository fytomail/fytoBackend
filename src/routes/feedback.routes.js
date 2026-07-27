const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedback.controller');

router.post('/', controller.submitFeedback);
router.get('/', controller.getFeedback);
router.get('/:id', controller.getFeedbackById);
router.delete('/:id', controller.deleteFeedback);

module.exports = router;
