import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

interface AddMovieDialogProps {
  open: boolean;
  onClose: () => void;
  fetchMovies: () => void;
}

const AddMovieDialog: React.FC<AddMovieDialogProps> = ({ open, onClose, fetchMovies }) => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  // const handleSubmit = async () => {
  //   await axios.post('http://localhost:5000/movies', { name, releaseDate });
  //   fetchMovies();
  //   onClose();
  // };

  const handleSubmit = async () => {
      await axios.post('https://saasmonk-movie-review.onrender.com/movies', { name, releaseDate });
      fetchMovies();
      onClose();
    };
  





  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Movie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Movie Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Release Date"
          type="date"
          fullWidth
          variant="outlined"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMovieDialog;