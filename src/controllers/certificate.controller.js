const Certificate = require('../models/certificate.model');
const ApiError = require('../utils/ApiError');

const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().populate('student');
    res.status(200).json({
      success: true,
      message: "Certificates retrieved successfully",
      data: certificates
    });
  } catch (error) {
    next(error);
  }
};

const getCertificateById = async (req, res, next) => {
  try {
    let certificate = await Certificate.findById(req.params.id).populate('student');
    if (!certificate) {
      certificate = await Certificate.findOne({ certificateId: req.params.id }).populate('student');
    }
    if (!certificate) {
      throw new ApiError(404, "Certificate not found");
    }
    res.status(200).json({
      success: true,
      message: "Certificate retrieved successfully",
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

const downloadCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Certificate download URL generated",
      data: { downloadUrl: certificate ? certificate.credentialUrl : "https://example.com/certificate.pdf" }
    });
  } catch (error) {
    next(error);
  }
};

const verifyCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    res.status(200).json({
      success: true,
      message: certificate ? "Certificate is valid" : "Certificate invalid or not found",
      data: { isValid: !!certificate, certificate }
    });
  } catch (error) {
    next(error);
  }
};

const generateCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json({
      success: true,
      message: "Certificate generated successfully",
      data: cert
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertificates,
  getCertificateById,
  downloadCertificate,
  verifyCertificate,
  generateCertificate
};
