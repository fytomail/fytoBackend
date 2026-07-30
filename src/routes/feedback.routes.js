const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedback.controller');
const auth = require('../middlewares/authenticate');

router.post('/', auth, controller.submitFeedback);
router.get('/', controller.getFeedback);
router.get('/:id', controller.getFeedbackById);
router.delete('/:id', auth, controller.deleteFeedback);

module.exports = router;
