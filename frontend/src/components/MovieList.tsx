////////////navbar
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent } from '@mui/material';
import AddMovieDialog from './AddMovieDialog';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);
//https://saasmonk-movie-review.onrender.com
  const fetchMovies = async () => {
    // const response = await axios.get('http://localhost:5000/movies');
     const response = await axios.get('https://saasmonk-movie-review.onrender.com/movies');
    setMovies(response.data);
  };

  const handleDelete = async (id: number) => {
    // await axios.delete(`http://localhost:5000/movies/${id}`);
    await axios.delete(`https://saasmonk-movie-review.onrender.com/movies/${id}`);
    fetchMovies();
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MOVIECRITIC
          </Typography>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>
            Add Movie
          </Button>
        </Toolbar>
      </AppBar>

      {/* Add Movie Dialog */}
      <AddMovieDialog open={openDialog} onClose={() => setOpenDialog(false)} fetchMovies={fetchMovies} />

      {/* Movie List */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2} mt={2}>
        {movies.map((movie: any) => (
          <Card key={movie.id} style={{ width: '300px', margin: '1rem', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h5">{movie.name}</Typography>
              <Typography color="textSecondary">{new Date(movie.releaseDate).toLocaleDateString()}</Typography>
              <Typography>Average Rating: {movie.averageRating || 'N/A'}</Typography>
              <Button onClick={() => handleDelete(movie.id)} color="secondary">Delete</Button>
              <Button href={`/movies/${movie.id}`} color="primary">View Reviews</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default MovieList;