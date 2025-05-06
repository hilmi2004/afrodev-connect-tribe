import mongoose from 'mongoose';
import { fetchAndStoreNewsDataArticles } from './services/newsDataService.js';
import { fetchAndStoreRSSArticles } from './services/rssFeedService.js';
import NewsArticle from './models/NewsArticle.js';

async function initialize() {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/blacktech");
        console.log('Database connected');

        console.log('Starting news refresh...');
        const [newsData, rssData] = await Promise.all([
            fetchAndStoreNewsDataArticles(),
            fetchAndStoreRSSArticles()
        ]);

        console.log(`
            Refresh completed:
            - NewsData.io: ${newsData.length} articles
            - RSS Feeds: ${rssData.length} articles
            - Total in DB: ${await NewsArticle.countDocuments({})}
        `);

        // Create text index if not exists
        try {
            await NewsArticle.createIndexes();
            console.log('Text indexes verified');
        } catch (error) {
            console.log('Index creation error:', error.message);
        }

        process.exit(0);
    } catch (error) {
        console.error('Initialization failed:', error);
        process.exit(1);
    }
}

initialize();