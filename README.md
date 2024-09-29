
# Movie Review App

This is a movie review application where users can submit reviews for movies, and the application calculates and displays average ratings.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application Locally](#running-the-application-locally)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Deployment**: Render

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (for the database)

### Clone the Repository

```bash
git clone https://github.com/rahul4793/saasMonk_movie_review.git
cd saasMonk_movie_review
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and set up your database connection string and other environment variables. Here’s an example of what to include:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
   PORT=5000
   In hurry to submit I have hard coded Backend URL on render it will work locally also because my backend is deployed on render
   If you want you can uncomment the localhost codes
   ```

   Replace `USER`, `PASSWORD`, and `DATABASE_NAME` with your PostgreSQL credentials.

4. Run database migrations (make sure you have the Prisma schema set up):

   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:

   ```bash
   npx ts-node src/server.ts
   ```

### Frontend Setup

1. Open another terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

4. The application will be running on `http://localhost:3000`.

## Running the Application Locally

- Make sure both the backend and frontend servers are running.
- Access the application by navigating to `http://localhost:3000` in your web browser.

## API Endpoints

### Movies

- **GET** `/movies` - Retrieve all movies
- **POST** `/movies` - Add a new movie

### Reviews

- **GET** `/movies/:movieId/reviews` - Retrieve all reviews for a specific movie
- **POST** `/movies/:movieId/reviews` - Add a new review for a specific movie
- **PUT** `/movies/:movieId/reviews/:id` - Update a specific review
- **DELETE** `/movies/:movieId/reviews/:id` - Delete a specific review


