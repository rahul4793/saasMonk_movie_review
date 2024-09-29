import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import MovieList from './components/MovieList';
import ReviewList from './components/ReviewList';

const ReviewListWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ReviewList movieId={Number(id)} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<ReviewListWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;











