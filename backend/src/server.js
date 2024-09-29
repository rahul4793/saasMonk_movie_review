"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// CRUD routes for Movie
app.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield prisma.movie.findMany();
    res.json(movies);
}));
app.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, releaseDate } = req.body;
    const movie = yield prisma.movie.create({
        data: { name, releaseDate: new Date(releaseDate) },
    });
    res.json(movie);
}));
app.put('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, releaseDate } = req.body;
    const movie = yield prisma.movie.update({
        where: { id: Number(id) },
        data: { name, releaseDate: new Date(releaseDate) },
    });
    res.json(movie);
}));
// Assuming an Express.js backend
//////////////////////////edit 
app.put('/api/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, releaseDate } = req.body;
    try {
        const movie = yield prisma.movie.update({
            where: { id: Number(id) },
            data: { name, releaseDate },
        });
        res.json(movie);
    }
    catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'An error occurred while updating the movie.' });
    }
}));
////////////////////////////edit
// CRUD routes for Review
app.get('/movies/:movieId/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const reviews = yield prisma.review.findMany({
        where: { movieId: Number(movieId) },
    });
    res.json(reviews);
}));
///////////////////////////////////////////////
app.delete('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.movie.delete({
        where: { id: Number(id) },
    });
    res.json({ message: 'Movie deleted' });
}));
// CRUD routes for Review
app.get('/movies/:movieId/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const reviews = yield prisma.review.findMany({
        where: { movieId: Number(movieId) },
    });
    res.json(reviews);
}));
app.post('/movies/:movieId/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const { reviewerName, rating, comment } = req.body;
    const review = yield prisma.review.create({
        data: {
            movieId: Number(movieId),
            reviewerName,
            rating,
            comment,
        },
    });
    // Update average rating
    const movie = yield prisma.movie.update({
        where: { id: Number(movieId) },
        data: {
            averageRating: {
                set: yield calculateAverageRating(Number(movieId)),
            },
        },
    });
    res.json(review);
}));
app.put('/movies/:movieId/reviews/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, id } = req.params;
    const { reviewerName, rating, comment } = req.body;
    const review = yield prisma.review.update({
        where: { id: Number(id) },
        data: { reviewerName, rating, comment },
    });
    // Update average rating
    yield prisma.movie.update({
        where: { id: Number(movieId) },
        data: {
            averageRating: {
                set: yield calculateAverageRating(Number(movieId)),
            },
        },
    });
    res.json(review);
}));
app.delete('/movies/:movieId/reviews/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, id } = req.params;
    yield prisma.review.delete({
        where: { id: Number(id) },
    });
    // Update average rating
    yield prisma.movie.update({
        where: { id: Number(movieId) },
        data: {
            averageRating: {
                set: yield calculateAverageRating(Number(movieId)),
            },
        },
    });
    res.json({ message: 'Review deleted' });
}));
// Helper function to calculate average rating
function calculateAverageRating(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield prisma.review.findMany({
            where: { movieId },
        });
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return reviews.length > 0 ? totalRating / reviews.length : null;
    });
}
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
