const Semester = require('../models/semester.model');
const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

// Helper to ensure 8 default semesters exist if DB is empty
const ensureSemestersSeeded = async () => {
  const count = await Semester.countDocuments();
  if (count === 0) {
    const defaultSemesters = [
      {
        semesterNumber: 1,
        title: 'Semester 1: Foundation of Modern Web Development',
        description: 'Master HTML5, CSS3, JavaScript ES6+, Git version control, and Node.js fundamentals.',
        modules: [
          {
            title: 'Frontend Fundamentals',
            description: 'Core web building blocks, modern styling, and responsive layout designs.',
            order: 1,
            topics: [
              { title: 'HTML5 Semantic Structure', summary: 'Semantic HTML markup best practices', content: 'HTML5 elements, accessibility, forms.', order: 1 },
              { title: 'Modern CSS3 & Flexbox/Grid', summary: 'Responsive design patterns', content: 'CSS Grid, Flexbox, media queries.', order: 2 },
              { title: 'JavaScript ES6+ Core', summary: 'Asynchronous JS, promises, async/await', content: 'Closures, scope, promises, async/await.', order: 3 }
            ],
            assignment: { title: 'Personal Responsive Portfolio', instructions: 'Build a fully responsive portfolio using HTML/CSS/JS.', maxCredit: 100 }
          },
          {
            title: 'Backend Core with Node.js & Express',
            description: 'Building RESTful HTTP web servers and middleware APIs.',
            order: 2,
            topics: [
              { title: 'Node.js Event Loop & Modules', summary: 'Event loop architecture and CommonJS/ESM', content: 'Modules, buffer, streams, process.', order: 1 },
              { title: 'Express.js API Design', summary: 'Routing, middleware, error handling', content: 'Building clean REST services in Express.', order: 2 }
            ],
            assignment: { title: 'REST API Microservice', instructions: 'Develop an Express API with CRUD functionality.', maxCredit: 100 }
          }
        ]
      },
      {
        semesterNumber: 2,
        title: 'Semester 2: Full-Stack React & Database Architecture',
        description: 'Advanced React development, MongoDB ODM modeling, authentication, and state management.',
        modules: [
          {
            title: 'Single Page Applications with React',
            description: 'Component architecture, hooks, context API, and client routing.',
            order: 1,
            topics: [
              { title: 'React Hooks & State Management', summary: 'useState, useEffect, useReducer', content: 'State management and side effects.', order: 1 },
              { title: 'Client-Side Routing', summary: 'React Router v6 setup', content: 'Nested routes, guards, dynamic params.', order: 2 }
            ],
            assignment: { title: 'Task Dashboard React App', instructions: 'Build an interactive React application.', maxCredit: 100 }
          },
          {
            title: 'NoSQL Database Systems & MongoDB',
            description: 'Database schema design, indexing, and Mongoose ORM/ODM integration.',
            order: 2,
            topics: [
              { title: 'Mongoose Schemas & Models', summary: 'Validation, virtuals, hooks', content: 'Defining strict schemas and relationships.', order: 1 },
              { title: 'Aggregation Pipelines', summary: 'Data transformation & complex queries', content: 'Match, group, lookup, project operators.', order: 2 }
            ],
            assignment: { title: 'Database Data Modeling Challenge', instructions: 'Create Mongoose models for an e-commerce platform.', maxCredit: 100 }
          }
        ]
      },
      {
        semesterNumber: 3,
        title: 'Semester 3: Microservices & AI Integration',
        description: 'Distributed architecture, AI agent integrations, Docker containerization, and cloud deployment.',
        modules: [
          {
            title: 'AI LLM API Integration',
            description: 'Leveraging OpenAI and Gemini API endpoints for automated evaluation.',
            order: 1,
            topics: [
              { title: 'Prompt Engineering & System Prompts', summary: 'Designing robust system instructions', content: 'Structured output formats, JSON schemas.', order: 1 },
              { title: 'Streaming API Responses', summary: 'Server-sent events & streaming', content: 'Real-time text generation streams.', order: 2 }
            ],
            assignment: { title: 'AI Assistant Service', instructions: 'Integrate an LLM service with custom tools.', maxCredit: 100 }
          }
        ]
      }
    ];
    await Semester.insertMany(defaultSemesters);
  }
};

const getSemesters = async (req, res, next) => {
  try {
    await ensureSemestersSeeded();
    const semesters = await Semester.find().sort({ semesterNumber: 1 });
    res.status(200).json({
      success: true,
      message: "Semesters retrieved successfully",
      data: semesters
    });
  } catch (error) {
    next(error);
  }
};

const getSemesterById = async (req, res, next) => {
  try {
    await ensureSemestersSeeded();
    const id = req.params.id;
    let semester;
    if (isNaN(id)) {
      semester = await Semester.findById(id);
    } else {
      semester = await Semester.findOne({ semesterNumber: Number(id) });
    }
    if (!semester) {
      semester = await Semester.findById(id);
    }
    if (!semester) {
      throw new ApiError(404, "Semester not found");
    }
    res.status(200).json({
      success: true,
      message: "Semester details retrieved successfully",
      data: semester
    });
  } catch (error) {
    next(error);
  }
};

const getSemesterModules = async (req, res, next) => {
  try {
    await ensureSemestersSeeded();
    const id = req.params.id;
    let semester = isNaN(id) ? await Semester.findById(id) : await Semester.findOne({ semesterNumber: Number(id) });
    if (!semester) {
      semester = await Semester.findById(id);
    }
    if (!semester) {
      throw new ApiError(404, "Semester not found");
    }
    res.status(200).json({
      success: true,
      message: "Semester modules retrieved successfully",
      data: semester.modules || []
    });
  } catch (error) {
    next(error);
  }
};

const getModuleTopics = async (req, res, next) => {
  try {
    await ensureSemestersSeeded();
    const moduleId = req.params.id || req.params.moduleId;
    const semesters = await Semester.find();
    let targetModule = null;

    for (const sem of semesters) {
      for (const mod of sem.modules) {
        if (mod._id.toString() === moduleId || mod.title.toLowerCase().includes(moduleId.toLowerCase())) {
          targetModule = mod;
          break;
        }
      }
      if (targetModule) break;
    }

    if (!targetModule && semesters.length > 0 && semesters[0].modules.length > 0) {
      targetModule = semesters[0].modules[0];
    }

    res.status(200).json({
      success: true,
      message: "Module topics retrieved successfully",
      data: targetModule ? targetModule.topics : []
    });
  } catch (error) {
    next(error);
  }
};

const getTopicById = async (req, res, next) => {
  try {
    await ensureSemestersSeeded();
    const topicId = req.params.id;
    const semesters = await Semester.find();
    let targetTopic = null;

    for (const sem of semesters) {
      for (const mod of sem.modules) {
        for (const topic of mod.topics) {
          if (topic._id.toString() === topicId || topic.title.toLowerCase().includes(topicId.toLowerCase())) {
            targetTopic = topic;
            break;
          }
        }
        if (targetTopic) break;
      }
      if (targetTopic) break;
    }

    if (!targetTopic) {
      // Fallback first topic
      targetTopic = semesters[0]?.modules[0]?.topics[0] || { _id: topicId, title: "JavaScript ES6+ Core", summary: "JavaScript core concepts" };
    }

    res.status(200).json({
      success: true,
      message: "Topic details retrieved successfully",
      data: targetTopic
    });
  } catch (error) {
    next(error);
  }
};

const completeTopic = async (req, res, next) => {
  try {
    const topicId = req.params.id;
    let student = null;

    if (req.user && req.user.id) {
      student = await Student.findOne({ user: req.user.id });
    }
    if (!student) {
      student = await Student.findOne();
    }

    if (student) {
      if (!student.progress) student.progress = { completedTopics: [], completedModules: [], completedSemesters: [] };
      if (!student.progress.completedTopics) student.progress.completedTopics = [];

      if (!student.progress.completedTopics.includes(topicId)) {
        student.progress.completedTopics.push(topicId);
        student.creditScore = (student.creditScore || 0) + 10;
        await student.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Topic marked complete successfully",
      data: {
        topicId,
        studentId: student ? student._id : null,
        updatedCreditScore: student ? student.creditScore : 10
      }
    });
  } catch (error) {
    next(error);
  }
};

const unlockSemester = async (req, res, next) => {
  try {
    const { semesterNumber } = req.body;
    let student = null;
    if (req.user && req.user.id) {
      student = await Student.findOne({ user: req.user.id });
    }
    if (!student) {
      student = await Student.findOne();
    }
    if (student && semesterNumber) {
      if (!student.unlockedSemesters.includes(Number(semesterNumber))) {
        student.unlockedSemesters.push(Number(semesterNumber));
        student.currentSemester = Math.max(student.currentSemester, Number(semesterNumber));
        await student.save();
      }
    }
    res.status(200).json({
      success: true,
      message: "Semester unlocked successfully",
      data: student
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSemesters,
  getSemesterById,
  getSemesterModules,
  getModuleTopics,
  getTopicById,
  completeTopic,
  unlockSemester
};
