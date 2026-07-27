const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificate.controller');

router.get('/', controller.getCertificates);
router.get('/:id', controller.getCertificateById);
router.get('/download', controller.downloadCertificate);
router.get('/verify', controller.verifyCertificate);
router.post('/generate', controller.generateCertificate);

module.exports = router;
