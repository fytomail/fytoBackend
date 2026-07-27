// certificate Controller
const getCertificates = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get certificates" });
  } catch (error) {
    next(error);
  }
};

const getCertificateById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get certificate" });
  } catch (error) {
    next(error);
  }
};

const downloadCertificate = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Download certificate" });
  } catch (error) {
    next(error);
  }
};

const verifyCertificate = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Verify certificate" });
  } catch (error) {
    next(error);
  }
};

const generateCertificate = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Generate certificate" });
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
