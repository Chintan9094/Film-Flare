const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'movie-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const { search, genre, year, sort = 'createdAt' } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) {
      query.genre = { $in: [genre] };
    }

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query.releaseDate = { $gte: startDate, $lte: endDate };
    }

    const sortOption = sort === 'rating' ? { rating: -1 } : { createdAt: -1 };
    const movies = await Movie.find(query).sort(sortOption);
    res.json(movies);
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Get movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add movie (protected)
router.post('/', auth, upload.single('posterImage'), async (req, res) => {
  try {
    const { title, releaseDate, duration, genre, description, trailerLink } = req.body;

    if (!title || !releaseDate || !duration || !genre || !description || !trailerLink) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const posterImage = req.file ? `/uploads/${req.file.filename}` : req.body.posterImage;

    const movie = new Movie({
      title,
      releaseDate,
      duration,
      genre: Array.isArray(genre) ? genre : [genre],
      description,
      posterImage,
      trailerLink
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error('Add movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update movie (protected)
router.put('/:id', auth, upload.single('posterImage'), async (req, res) => {
  try {
    const { title, releaseDate, duration, genre, description, trailerLink } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (title) movie.title = title;
    if (releaseDate) movie.releaseDate = releaseDate;
    if (duration) movie.duration = duration;
    if (genre) movie.genre = Array.isArray(genre) ? genre : [genre];
    if (description) movie.description = description;
    if (trailerLink) movie.trailerLink = trailerLink;
    if (req.file) {
      // Delete old image if exists
      if (movie.posterImage && movie.posterImage.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', movie.posterImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      movie.posterImage = `/uploads/${req.file.filename}`;
    }

    movie.updatedAt = Date.now();
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error('Update movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete movie (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Delete associated image
    if (movie.posterImage && movie.posterImage.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', movie.posterImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Delete movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate movie
router.post('/:id/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const newTotalRatings = movie.totalRatings + 1;
    const newRating = ((movie.rating * movie.totalRatings) + rating) / newTotalRatings;

    movie.rating = newRating;
    movie.totalRatings = newTotalRatings;
    await movie.save();

    res.json({ rating: movie.rating, totalRatings: movie.totalRatings });
  } catch (error) {
    console.error('Rate movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

