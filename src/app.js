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

const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const domainRoutes = require('./routes/domain.routes');
const roleRoutes = require('./routes/role.routes');
const roadmapRoutes = require('./routes/roadmap.routes');
const learningRoutes = require('./routes/learning.routes');
const practiceRoutes = require('./routes/practice.routes');
const taskRoutes = require('./routes/task.routes');
const projectRoutes = require('./routes/project.routes');
const validationRoutes = require('./routes/validation.routes');
const certificateRoutes = require('./routes/certificate.routes');
const profileRoutes = require('./routes/profile.routes');
const companyRoutes = require('./routes/company.routes');
const jobsRoutes = require('./routes/jobs.routes');
const recruiterRoutes = require('./routes/recruiter.routes');
const hiringRoutes = require('./routes/hiring.routes');
const adminRoutes = require('./routes/admin.routes');
const notificationRoutes = require('./routes/notification.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const creditRoutes = require('./routes/credit.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const collegeRoutes = require('./routes/college.routes');
const paymentRoutes = require('./routes/payment.routes');
const aiRoutes = require('./routes/ai.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

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

// Route mountings
app.use(`${appConfig.apiPrefix}/auth`, authRoutes);
app.use(`${appConfig.apiPrefix}/students`, studentRoutes);
app.use(`${appConfig.apiPrefix}/domains`, domainRoutes);
app.use(`${appConfig.apiPrefix}/roles`, roleRoutes);
app.use(`${appConfig.apiPrefix}/roadmaps`, roadmapRoutes);
app.use(`${appConfig.apiPrefix}/learning`, learningRoutes);
app.use(`${appConfig.apiPrefix}/practice`, practiceRoutes);
app.use(`${appConfig.apiPrefix}/projects`, projectRoutes);
app.use(`${appConfig.apiPrefix}/tasks`, taskRoutes);
app.use(`${appConfig.apiPrefix}/validation`, validationRoutes);
app.use(`${appConfig.apiPrefix}/certificates`, certificateRoutes);
app.use(`${appConfig.apiPrefix}/profiles`, profileRoutes);
app.use(`${appConfig.apiPrefix}/companies`, companyRoutes);
app.use(`${appConfig.apiPrefix}/jobs`, jobsRoutes);
app.use(`${appConfig.apiPrefix}/recruiters`, recruiterRoutes);
app.use(`${appConfig.apiPrefix}/hiring`, hiringRoutes);
app.use(`${appConfig.apiPrefix}/admin`, adminRoutes);
app.use(`${appConfig.apiPrefix}/notifications`, notificationRoutes);
app.use(`${appConfig.apiPrefix}/analytics`, analyticsRoutes);
app.use(`${appConfig.apiPrefix}/credit`, creditRoutes);
app.use(`${appConfig.apiPrefix}/leaderboard`, leaderboardRoutes);
app.use(`${appConfig.apiPrefix}/colleges`, collegeRoutes);
app.use(`${appConfig.apiPrefix}/payments`, paymentRoutes);
app.use(`${appConfig.apiPrefix}/ai`, aiRoutes);

// Handle unknown API paths with a 404 error
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

// Centralized error middleware
app.use(errorHandler);

module.exports = app;
