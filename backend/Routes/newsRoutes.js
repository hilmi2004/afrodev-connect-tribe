import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import {
    getTechNews,
    refreshNewsArticles,
    getArticleById
} from '../controllers/newsController.js';
import NewsArticle from "../Models/NewsArticle.js";
import {fetchAndStoreRSSArticles} from "../services/rssFeedService.js";
import {fetchAndStoreNewsDataArticles} from "../services/newsDataService.js";

const router = express.Router();

// Add this route before exporting
router.get('/debug/refresh', async (req, res) => {
    try {
        const [newsDataArticles, rssArticles] = await Promise.all([
            fetchAndStoreNewsDataArticles(),
            fetchAndStoreRSSArticles()
        ]);

        res.json({
            success: true,
            message: 'Manual refresh completed',
            newsDataCount: newsDataArticles.length,
            rssCount: rssArticles.length,
            totalArticles: await NewsArticle.countDocuments({})
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add these new routes
router.get('/debug/status', async (req, res) => {
    try {
        const totalArticles = await NewsArticle.countDocuments({});
        const latestArticle = await NewsArticle.findOne().sort({ publishDate: -1 });

        res.json({
            success: true,
            totalArticles,
            latestArticle: latestArticle ? {
                title: latestArticle.title,
                date: latestArticle.publishDate,
                source: latestArticle.source
            } : null,
            collections: await NewsArticle.distinct('category'),
            textSearchEnabled: await checkTextIndex()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/debug/refresh', async (req, res) => {
    try {
        const [newsData, rssData] = await Promise.all([
            fetchAndStoreNewsDataArticles(),
            fetchAndStoreRSSArticles()
        ]);

        const stats = {
            newsDataAdded: newsData.length,
            rssDataAdded: rssData.length,
            totalArticles: await NewsArticle.countDocuments({})
        };

        res.json({ success: true, ...stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

async function checkTextIndex() {
    try {
        const indexes = await NewsArticle.listIndexes().toArray();
        return indexes.some(index => index.name === 'news_search_index');
    } catch {
        return false;
    }
}
// Public routes
router.get('/', getTechNews);
router.get('/:id', getArticleById);

// Admin routes
router.post('/refresh', protect, authorize('admin'), refreshNewsArticles);

export default router;