const express = require('express');
const { getAllMovies, createMovie } = require('../controllers/movieController');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createMovie);

module.exports = router;