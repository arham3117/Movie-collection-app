const express = require('express');
const path = require('path');
const { connectDB, disconnectDB } = require('./config/database');
const securityMiddleware = require('./middleware/security');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 9001;

securityMiddleware(app);

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🎬 Movie Database Server running on http://localhost:${PORT}`);
    console.log(`📱 Open in browser: http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);

module.exports = app;