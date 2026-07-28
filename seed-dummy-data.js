const mongoose = require('mongoose');
const dbConfig = require('./src/config/db.config');

const Project = require('./src/models/project.model');
const User = require('./src/models/user.model');
const Student = require('./src/models/student.model');

const dummyProjects = [
  { projectTitle: 'E-commerce API Gateway', repoUrl: 'https://github.com/example/ecommerce-api', liveUrl: 'https://ecommerce.example.com', status: 'VERIFIED' },
  { projectTitle: 'Interactive AI Chat Room', repoUrl: 'https://github.com/example/ai-chatroom', status: 'EVALUATED' },
  { projectTitle: 'Personal Portfolios Showcase', repoUrl: 'https://github.com/example/portfolio-showcase', status: 'SUBMITTED' }
];

console.log('Connecting to database...');
mongoose.connect(dbConfig.uri, dbConfig.options)
  .then(async () => {
    console.log('Connected successfully. Cleaning up old database collections...');
    
    await Project.deleteMany({});
    await User.deleteMany({});
    await Student.deleteMany({});

    console.log('Seeding default login user credentials...');

    // Seed default users using User.create so bcrypt password pre-save hook triggers
    const studentUser = await User.create({
      name: 'Student Demo User',
      username: 'student',
      email: 'student@example.com',
      password: 'student123',
      role: 'student',
      defaultPortal: 'Student Portal'
    });

    const adminUser = await User.create({
      name: 'Admin Demo User',
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      defaultPortal: 'Admin Portal'
    });

    const companyUser = await User.create({
      name: 'Company HR User',
      username: 'company_hr',
      email: 'hr@company.com',
      password: 'company123',
      role: 'company_hr',
      defaultPortal: 'Company Portal'
    });

    const studentProfile = await Student.create({
      user: studentUser._id,
      name: studentUser.name,
      phone: '+1 555 0199',
      university: 'Massachusetts Institute of Technology',
      creditScore: 250,
      currentSemester: 3,
      unlockedSemesters: [1, 2, 3],
      leaderboardRank: 1,
      skills: ['Node.js', 'React', 'MongoDB', 'Python'],
      interests: ['Web Development', 'Artificial Intelligence']
    });

    const projectsToSeed = dummyProjects.map(p => ({ ...p, student: studentProfile._id }));
    const projectsResult = await Project.insertMany(projectsToSeed);
    console.log(`  └─ Successfully seeded ${projectsResult.length} Projects!`);

    console.log(`  └─ Successfully seeded default User credentials:`);
    console.log(`     1) Student: username='student' OR email='student@example.com' | password='student123'`);
    console.log(`     2) Admin:   username='admin'   OR email='admin@example.com'   | password='admin123'`);
    console.log(`     3) HR:      username='company_hr' OR email='hr@company.com' | password='company123'`);
    console.log(`  └─ Successfully created Student profile ID: ${studentProfile._id}`);

    console.log('Seeding process complete!');
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection / seeding failed:', err);
    process.exit(1);
  });
