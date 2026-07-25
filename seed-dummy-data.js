const mongoose = require('mongoose');
const dbConfig = require('./src/config/db.config');

const College = require('./src/models/college.model');
const Jobs = require('./src/models/jobs.model');
const Project = require('./src/models/project.model');

const dummyColleges = [
  { name: 'Massachusetts Institute of Technology', location: 'Cambridge, MA', establishedYear: 1861 },
  { name: 'Stanford University', location: 'Stanford, CA', establishedYear: 1885 },
  { name: 'Oxford University', location: 'Oxford, UK', establishedYear: 1096 }
];

const dummyJobs = [
  { title: 'Frontend Developer', companyName: 'Google', salary: '$120,000/yr', requirements: ['React', 'JavaScript', 'TailwindCSS'] },
  { title: 'Full Stack Engineer', companyName: 'Stripe', salary: '$145,000/yr', requirements: ['Node.js', 'PostgreSQL', 'TypeScript'] },
  { title: 'AI Research Scientist', companyName: 'OpenAI', salary: '$210,000/yr', requirements: ['Python', 'PyTorch', 'Transformers'] }
];

const dummyProjects = [
  { title: 'E-commerce API Gateway', description: 'Design a high-throughput stripe microservice gateway', difficulty: 'Intermediate' },
  { title: 'Interactive AI Chat Room', description: 'Build a serverless WebSockets chat application powered by LLM models', difficulty: 'Advanced' },
  { title: 'Personal Portfolios Showcase', description: 'Create a clean, responsive single-page responsive portfolio layout', difficulty: 'Beginner' }
];

console.log('Connecting to database...');
mongoose.connect(dbConfig.uri, dbConfig.options)
  .then(async () => {
    console.log('Connected successfully. Cleaning up old database collections...');
    
    await College.deleteMany({});
    await Jobs.deleteMany({});
    await Project.deleteMany({});

    console.log('Seeding new dummy data into MongoDB Atlas...');
    
    const collegesResult = await College.insertMany(dummyColleges);
    console.log(`  └─ Successfully seeded ${collegesResult.length} Colleges!`);
    
    const jobsResult = await Jobs.insertMany(dummyJobs);
    console.log(`  └─ Successfully seeded ${jobsResult.length} Jobs!`);
    
    const projectsResult = await Project.insertMany(dummyProjects);
    console.log(`  └─ Successfully seeded ${projectsResult.length} Projects!`);

    console.log('Seeding process complete!');
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection / seeding failed:', err);
    process.exit(1);
  });
