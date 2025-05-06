import Parser from 'rss-parser';
import { protect } from '../middlewares/auth.js';

const parser = new Parser();

export const parseRSSFeed = async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'URL parameter is required'
            });
        }

        const feed = await parser.parseURL(url);

        res.json({
            success: true,
            feed
        });
    } catch (error) {
        console.error('RSS Parsing Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to parse RSS feed',
            error: error.message
        });
    }
};