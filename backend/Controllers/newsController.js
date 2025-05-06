import NewsArticle from '../models/NewsArticle.js';
import { fetchAndStoreNewsDataArticles } from '../services/newsDataService.js';
import { fetchAndStoreRSSArticles } from '../services/rssFeedService.js';

export const getTechNews = async (req, res) => {
    try {
        const { limit = 20, page = 1 } = req.query;

        const articles = await NewsArticle.find({})
            .sort({ publishDate: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .lean();

        const total = await NewsArticle.countDocuments({});

        // Ensure all articles have required fields
        const processedArticles = articles.map(article => ({
            ...article,
            imageUrl: article.imageUrl || 'https://via.placeholder.com/600x400?text=Tech+News',
            readTime: article.readTime || '2 min read'
        }));

        res.json({
            success: true,
            articles: processedArticles,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit))
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        // Return empty array if error occurs
        res.status(200).json({
            success: false,
            message: 'Temporary issue loading news',
            articles: [],
            total: 0,
            page: 1,
            totalPages: 1
        });
    }
};

// Temporary demo data generator (remove in production)
function getDemoNewsData() {
    return [...Array(5)].map((_, i) => ({
        _id: `demo-${i}`,
        title: `Demo Tech News ${i + 1}`,
        excerpt: 'This is placeholder content while we load the latest tech news.',
        imageUrl: getDefaultTechImage(),
        category: ['technology', 'ai', 'mobile', 'web', 'fintech'][i % 5],
        publishDate: new Date(),
        readTime: `${i + 2} min read`,
        author: {
            name: ['Tech Reporter', 'AI Specialist', 'Mobile Expert'][i % 3],
            avatar: getDefaultAvatar()
        },
        url: '#',
        featured: i === 0,
        trending: i === 1
    }));
}

export const refreshNewsArticles = async (req, res) => {
    try {
        // Only allow admins to manually refresh
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const [newsDataArticles, rssArticles] = await Promise.all([
            fetchAndStoreNewsDataArticles(),
            fetchAndStoreRSSArticles()
        ]);

        res.json({
            success: true,
            message: 'News articles refreshed',
            newsDataCount: newsDataArticles.length,
            rssCount: rssArticles.length
        });
    } catch (error) {
        console.error('Error refreshing news articles:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to refresh news articles'
        });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await NewsArticle.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.json({
            success: true,
            article
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch article'
        });
    }
};