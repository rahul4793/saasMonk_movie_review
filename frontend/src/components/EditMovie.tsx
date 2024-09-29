import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const EditMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie details when the component mounts
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        const movie = response.data;
        setName(movie.name);
        setReleaseDate(movie.releaseDate);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`/api/movies/${id}`, {
        name,
        releaseDate
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <Container>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Release Date"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditMovie;
