const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 9001;

// Security and middleware
app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/movies', async (req, res) => {
  try {
    const { search } = req.query;
    let movies;
    if (search) {
      // SQLite doesn't support case-insensitive contains, so we'll do it manually
      const allMovies = await prisma.movie.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      const searchLower = search.toLowerCase();
      movies = allMovies.filter(movie => 
        movie.name.toLowerCase().includes(searchLower) || 
        movie.producer.toLowerCase().includes(searchLower)
      );
    } else {
      movies = await prisma.movie.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }
    res.json(movies);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const { name, producer, releaseDate } = req.body;
    
    // Input validation
    if (!name || !producer || !releaseDate) {
      return res.status(400).json({ error: 'Name, producer, and release date are required' });
    }
    
    if (name.trim().length === 0 || producer.trim().length === 0) {
      return res.status(400).json({ error: 'Name and producer cannot be empty' });
    }
    
    // Validate date
    const date = new Date(releaseDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid release date' });
    }
    
    const movie = await prisma.movie.create({
      data: {
        name: name.trim(),
        producer: producer.trim(),
        releaseDate: date
      }
    });
    res.json(movie);
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🎬 Movie Database Server running on http://localhost:${PORT}`);
  console.log(`📱 Open in browser: http://localhost:${PORT}`);
});