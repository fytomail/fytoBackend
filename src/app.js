const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const appConfig = require('./config/app.config');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/ApiError');
const logger = require('./middlewares/logger');

// Domain Route Modules (Prime Wave BRD Workflow)
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const semesterRoutes = require('./routes/semester.routes');
const moduleRoutes = require('./routes/module.routes');
const topicRoutes = require('./routes/topic.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const roadmapRoutes = require('./routes/roadmap.routes');
const aiRoutes = require('./routes/ai.routes');
const assignmentRoutes = require('./routes/assignment.routes');
const projectRoutes = require('./routes/project.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const certificateRoutes = require('./routes/certificate.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const companyRoutes = require('./routes/company.routes');
const jobRoutes = require('./routes/job.routes');
const adminRoutes = require('./routes/admin.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

// Security HTTP headers
app.use(helmet());

// Request logging via morgan + winston
if (appConfig.env !== 'test') {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
}

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// CORS configuration
app.use(cors({
  origin: appConfig.clientUrl,
  credentials: true
}));

// Apply global rate limiting to all API endpoints
app.use(appConfig.apiPrefix, rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redirect root URL to Swagger API Docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Prime Wave API Route Mountings
app.use(`${appConfig.apiPrefix}/auth`, authRoutes);
app.use(`${appConfig.apiPrefix}/students`, studentRoutes);
app.use(`${appConfig.apiPrefix}/semesters`, semesterRoutes);
app.use(`${appConfig.apiPrefix}/modules`, moduleRoutes);
app.use(`${appConfig.apiPrefix}/topics`, topicRoutes);
app.use(`${appConfig.apiPrefix}/dashboard`, dashboardRoutes);
app.use(`${appConfig.apiPrefix}/dashboards`, dashboardRoutes);
app.use(`${appConfig.apiPrefix}/roadmap`, roadmapRoutes);
app.use(`${appConfig.apiPrefix}/ai`, aiRoutes);
app.use(`${appConfig.apiPrefix}/assignments`, assignmentRoutes);
app.use(`${appConfig.apiPrefix}/projects`, projectRoutes);
app.use(`${appConfig.apiPrefix}/leaderboard`, leaderboardRoutes);
app.use(`${appConfig.apiPrefix}/certificates`, certificateRoutes);
app.use(`${appConfig.apiPrefix}/portfolio`, portfolioRoutes);
app.use(`${appConfig.apiPrefix}/feedback`, feedbackRoutes);
app.use(`${appConfig.apiPrefix}/company`, companyRoutes);
app.use(`${appConfig.apiPrefix}/companies`, companyRoutes);
app.use(`${appConfig.apiPrefix}/jobs`, jobRoutes);
app.use(`${appConfig.apiPrefix}/admin`, adminRoutes);

// Handle unknown API paths with a 404 error
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

// Centralized error middleware
app.use(errorHandler);

module.exports = app;
