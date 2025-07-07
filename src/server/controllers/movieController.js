const { prisma } = require('../config/database');

const getAllMovies = async (req, res) => {
  try {
    const { search } = req.query;
    let movies;
    
    if (search) {
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
};

const createMovie = async (req, res) => {
  try {
    const { name, producer, releaseDate } = req.body;
    
    if (!name || !producer || !releaseDate) {
      return res.status(400).json({ error: 'Name, producer, and release date are required' });
    }
    
    if (name.trim().length === 0 || producer.trim().length === 0) {
      return res.status(400).json({ error: 'Name and producer cannot be empty' });
    }
    
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
};

module.exports = { getAllMovies, createMovie };