const Company = require('../models/company.model');
const JobPost = require('../models/job.model');
const Hiring = require('../models/hiring.model');
const ApiError = require('../utils/ApiError');

const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      message: "Companies retrieved successfully",
      data: companies
    });
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      throw new ApiError(404, "Company not found");
    }
    res.status(200).json({
      success: true,
      message: "Company retrieved successfully",
      data: company
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Company login" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Company profile" });
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await JobPost.find().populate('company');
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    let jobData = { ...req.body };
    if (!jobData.company) {
      const firstCompany = await Company.findOne();
      if (firstCompany) jobData.company = firstCompany._id;
    }
    const job = await JobPost.create(jobData);
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await JobPost.findById(req.params.id).populate('company');
    if (!job) {
      throw new ApiError(404, "Job post not found");
    }
    res.status(200).json({
      success: true,
      message: "Job retrieved successfully",
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const getJobCandidates = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const candidates = await Hiring.find({ jobPost: jobId }).populate('student');
    res.status(200).json({
      success: true,
      message: "Job candidates retrieved successfully",
      data: candidates
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Job updated", data: job });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    await JobPost.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};

const getCandidates = async (req, res, next) => {
  try {
    const candidates = await Hiring.find().populate('student').populate('company').populate('jobPost');
    res.status(200).json({ success: true, message: "Candidates list", data: candidates });
  } catch (error) {
    next(error);
  }
};

const getCandidateById = async (req, res, next) => {
  try {
    const candidate = await Hiring.findById(req.params.id).populate('student').populate('company');
    res.status(200).json({ success: true, message: "Candidate details", data: candidate });
  } catch (error) {
    next(error);
  }
};

const shortlistCandidate = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Candidate shortlisted" });
  } catch (error) {
    next(error);
  }
};

const scheduleInterview = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Interview scheduled" });
  } catch (error) {
    next(error);
  }
};

const hiringDecision = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Hiring decision recorded" });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Company analytics" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanies,
  createCompany,
  getCompanyById,
  login,
  getProfile,
  getJobs,
  createJob,
  getJobById,
  getJobCandidates,
  updateJob,
  deleteJob,
  getCandidates,
  getCandidateById,
  shortlistCandidate,
  scheduleInterview,
  hiringDecision,
  getAnalytics
};
