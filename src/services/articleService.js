// services/articleService.js

import Article from "../../backend/Models/Article.js";
import {generateSlug} from "../../backend/utils/slugGenerator.js";

export const createArticle = async (articleData, userId, authorName) => {
    try {
        const slug = await generateSlug(articleData.title);

        const article = new Article({
            ...articleData,
            author: userId,
            authorName,
            slug,
            readTime: parseInt(articleData.readTime) || 0,
            status: 'published'
        });

        await article.save();
        return { success: true, article };
    } catch (error) {
        console.error('Error creating article:', error);
        return { success: false, message: error.message };
    }
};

export const getArticlesByAuthor = async (userId) => {
    try {
        const articles = await Article.find({ author: userId, status: 'published' })
            .sort({ createdAt: -1 })
            .populate('comments');

        return { success: true, articles };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { success: false, message: error.message };
    }
};

export const getArticleBySlug = async (slug) => {
    try {
        const article = await Article.findOne({ slug })
            .populate('author', 'fullName profileImage')
            .populate('comments');

        if (!article) {
            return { success: false, message: 'Article not found' };
        }

        return { success: true, article };
    } catch (error) {
        console.error('Error fetching article:', error);
        return { success: false, message: error.message };
    }
};

export const incrementArticleViews = async (articleId) => {
    try {
        await Article.findByIdAndUpdate(articleId, { $inc: { views: 1 } });
        return { success: true };
    } catch (error) {
        console.error('Error incrementing views:', error);
        return { success: false, message: error.message };
    }
};

export const searchArticles = async (query) => {
    try {
        const articles = await Article.find(
            { $text: { $search: query }, status: 'published' },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .limit(20);

        return { success: true, articles };
    } catch (error) {
        console.error('Error searching articles:', error);
        return { success: false, message: error.message };
    }
};

// Add this to articleService.js
