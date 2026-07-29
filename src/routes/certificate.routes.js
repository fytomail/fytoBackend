const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificate.controller');

router.get('/', controller.getCertificates);
router.post('/', controller.generateCertificate);
router.get('/:id', controller.getCertificateById);
router.get('/:id/download', controller.downloadCertificate);
router.get('/:id/verify', controller.verifyCertificate);

module.exports = router;
