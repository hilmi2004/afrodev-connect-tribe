// routes/articleRoutes.js
import express from 'express';
import {
    createArticleHandler,
    getArticleHandler,
    getUserArticlesHandler,
    searchArticlesHandler
} from '../controllers/articleController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Create article - protected route
router.post('/', protect, createArticleHandler);

// Get user's articles (make userId required or handle it differently)
// OR if you want to get current user's articles when no ID is provided
router.get('/user', protect, getUserArticlesHandler);
router.get('/user/:userId', getUserArticlesHandler);

// Get single article by slug
router.get('/:slug', getArticleHandler);

// Search articles
router.get('/search', searchArticlesHandler);

export default router;