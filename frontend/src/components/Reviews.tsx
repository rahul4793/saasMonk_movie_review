// src/components/Reviews.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Box, Card, CardContent } from '@mui/material';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    // const response = await axios.get('http://localhost:5000/reviews'); // Update the API endpoint as needed
    const response = await axios.get('https://saasmonk-movie-review.onrender.com/reviews'); // Update the API endpoint as needed
    setReviews(response.data);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MOVIECRITIC - All Reviews
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Reviews List */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2} mt={2}>
        {reviews.map((review: any) => (
          <Card key={review.id} style={{ width: '300px', margin: '1rem', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h5">{review.movieName}</Typography>
              <Typography color="textSecondary">Reviewer: {review.reviewerName || 'Anonymous'}</Typography>
              <Typography>Rating: {review.rating}</Typography>
              <Typography>{review.comments}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Reviews;
