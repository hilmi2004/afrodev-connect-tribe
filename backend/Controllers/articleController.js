// controllers/articleController.js
import mongoose from 'mongoose';
import Article from '../models/Article.js'; // Add this import

import {
    createArticle,
    getArticleBySlug,
    getArticlesByAuthor,
    incrementArticleViews, searchArticles
} from "../../src/services/articleService.js";

export const createArticleHandler = async (req, res) => {
    try {
        const { title, excerpt, content, tags, readTime, featuredImage, category } = req.body;

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const result = await createArticle(
            { title, excerpt, content, tags, readTime, featuredImage, category },
            req.user._id,
            req.user.fullName
        );

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Error in createArticleHandler:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getUserArticlesHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Add validation for the userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        const articles = await Article.find({
            author: userId,
            status: 'published'
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            articles
        });

    } catch (error) {
        console.error('Error fetching user articles:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching articles'
        });
    }
};

export const getArticleHandler = async (req, res) => {
    try {
        console.log('Received request for slug:', req.params.slug); // Debug log

        const { slug } = req.params;
        const article = await Article.findOne({ slug })
            .populate('author', 'fullName profileImage');

        if (!article) {
            console.log('Article not found for slug:', slug); // Debug log
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        // Increment views
        await incrementArticleViews(article._id);

        res.status(200).json({
            success: true,
            article
        });
    } catch (error) {
        console.error('Error in getArticleHandler:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

export const searchArticlesHandler = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Search query must be at least 3 characters'
            });
        }

        const result = await searchArticles(query);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in searchArticlesHandler:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};