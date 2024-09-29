import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// CRUD routes for Movie
app.get('/movies', async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const { name, releaseDate } = req.body;
  const movie = await prisma.movie.create({
    data: { name, releaseDate: new Date(releaseDate) },
  });
  res.json(movie);
});

app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, releaseDate } = req.body;
  const movie = await prisma.movie.update({
    where: { id: Number(id) },
    data: { name, releaseDate: new Date(releaseDate) },
  });
  res.json(movie);
});


// Assuming an Express.js backend
//////////////////////////edit 
app.put('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, releaseDate } = req.body;

  try {
    const movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: { name, releaseDate },
    });
    res.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'An error occurred while updating the movie.' });
  }
});
////////////////////////////edit




// CRUD routes for Review
app.get('/movies/:movieId/reviews', async (req, res) => {
  const { movieId } = req.params;
  const reviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
  });
  res.json(reviews);
});



///////////////////////////////////////////////

app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.movie.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Movie deleted' });
});

// CRUD routes for Review
app.get('/movies/:movieId/reviews', async (req, res) => {
  const { movieId } = req.params;
  const reviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
  });
  res.json(reviews);
});

app.post('/movies/:movieId/reviews', async (req, res) => {
  const { movieId } = req.params;
  const { reviewerName, rating, comment } = req.body;
  const review = await prisma.review.create({
    data: {
      movieId: Number(movieId),
      reviewerName,
      rating,
      comment,
    },
  });
  
  // Update average rating
  const movie = await prisma.movie.update({
    where: { id: Number(movieId) },
    data: {
      averageRating: {
        set: await calculateAverageRating(Number(movieId)),
      },
    },
  });
  
  res.json(review);
});

app.put('/movies/:movieId/reviews/:id', async (req, res) => {
  const { movieId, id } = req.params;
  const { reviewerName, rating, comment } = req.body;
  const review = await prisma.review.update({
    where: { id: Number(id) },
    data: { reviewerName, rating, comment },
  });
  
  // Update average rating
  await prisma.movie.update({
    where: { id: Number(movieId) },
    data: {
      averageRating: {
        set: await calculateAverageRating(Number(movieId)),
      },
    },
  });

  res.json(review);
});

app.delete('/movies/:movieId/reviews/:id', async (req, res) => {
  const { movieId, id } = req.params;
  await prisma.review.delete({
    where: { id: Number(id) },
  });
  
  // Update average rating
  await prisma.movie.update({
    where: { id: Number(movieId) },
    data: {
      averageRating: {
        set: await calculateAverageRating(Number(movieId)),
      },
    },
  });

  res.json({ message: 'Review deleted' });
});

// Helper function to calculate average rating
async function calculateAverageRating(movieId: number) {
  const reviews = await prisma.review.findMany({
    where: { movieId },
  });
  const totalRating = reviews.reduce((acc: any, review: { rating: any; }) => acc + review.rating, 0);
  return reviews.length > 0 ? totalRating / reviews.length : null;
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});