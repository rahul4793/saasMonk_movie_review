import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ReviewList: React.FC<{ movieId: number }> = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get(`http://localhost:5000/movies/${movieId}/reviews`);
    setReviews(response.data);
  };

  const handleAddReview = async () => {
    await axios.post(`http://localhost:5000/movies/${movieId}/reviews`, { reviewerName, rating, comment });
    fetchReviews();
  };

    function handleDelete(id: any): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div>
      <h2>Reviews</h2>
      <div>
        <input placeholder="Reviewer Name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
        <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button onClick={handleAddReview}>Add Review</Button>
      </div>
      {reviews.map((review: any) => (
        <Card key={review.id} style={{ margin: '1rem' }}>
          <CardContent>
            <Typography variant="h6">{review.reviewerName || 'Anonymous'}</Typography>
            <Typography>Rating: {review.rating}</Typography>
            <Typography>{review.comment}</Typography>
            <Button onClick={() => handleDelete(review.id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;