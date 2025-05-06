import { newsDataAxios } from '../utils/axiosConfig.js';
import NewsArticle from '../models/NewsArticle.js';

// Image configuration
const IMAGE_CONFIG = {
    defaultImages: {
        technology: 'https://images.unsplash.com/photo-1553484771-371a605b060b',
        business: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
        science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
        health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528',
        startups: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
        innovation: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        ai: 'https://images.unsplash.com/photo-1677442135136-760c813cd6d0',
        fintech: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3'
    },
    sourceSpecific: {
        techpoint: 'https://techpoint.africa/wp-content/uploads/2018/07/techpoint-logo.png',
        'disrupt-africa': 'https://www.disrupt-africa.com/wp-content/uploads/2015/12/disrupt-africa-logo.png',
        techcabal: 'https://techcabal.com/wp-content/uploads/2020/05/cropped-techcabal-favicon-512x512-1-32x32.png'
    }
};

export const fetchAndStoreNewsDataArticles = async () => {
    try {
        console.log('Fetching from NewsData.io...');
        const response = await newsDataAxios.get('/news');

        if (!response.data?.results) {
            console.log('No results in NewsData.io response');
            return [];
        }

        console.log(`Received ${response.data.results.length} articles from NewsData.io`);

        const savedArticles = [];
        const processingStats = { saved: 0, skipped: 0, errors: 0 };

        for (const article of response.data.results) {
            try {
                // Basic validation
                if (!article.title || !article.link) {
                    processingStats.skipped++;
                    continue;
                }

                // Check for duplicates
                const existingArticle = await NewsArticle.findOne({
                    $or: [
                        { url: article.link },
                        {
                            title: article.title,
                            publishDate: {
                                $gte: new Date(new Date(article.pubDate).getTime() - 24 * 60 * 60 * 1000),
                                $lte: new Date(new Date(article.pubDate).getTime() + 24 * 60 * 60 * 1000)
                            }
                        }
                    ]
                });

                if (existingArticle) {
                    processingStats.skipped++;
                    continue;
                }

                // Process and save article
                const newArticle = new NewsArticle({
                    source: article.source_id || 'newsdata',
                    sourceType: 'newsdata',
                    title: article.title,
                    excerpt: article.description || article.title.substring(0, 150) + '...',
                    content: article.content || '',
                    imageUrl: getArticleImage(article),
                    category: getPrimaryCategory(article),
                    publishDate: new Date(article.pubDate),
                    readTime: estimateReadTime(article),
                    author: {
                        name: getAuthorName(article),
                        avatar: getAuthorAvatar(article)
                    },
                    url: article.link,
                    country: article.country?.[0] || '',
                    metadata: article,
                    featured: Math.random() > 0.8, // 20% chance
                    trending: Math.random() > 0.9  // 10% chance
                });

                await newArticle.save();
                savedArticles.push(newArticle);
                processingStats.saved++;

                console.log(`Saved: ${article.title.substring(0, 50)}... [Image: ${newArticle.imageUrl?.substring(0, 30)}...]`);

            } catch (error) {
                processingStats.errors++;
                console.error(`Error processing article: ${error.message}`);
            }
        }

        console.log(`Processing complete:
            - Saved: ${processingStats.saved}
            - Skipped: ${processingStats.skipped}
            - Errors: ${processingStats.errors}`);

        return savedArticles;

    } catch (error) {
        console.error('Error in fetchAndStoreNewsDataArticles:', error);
        return [];
    }
};

// Image Handling Functions
function getArticleImage(article) {
    // 1. Direct image URL
    if (isValidImageUrl(article.image_url)) return article.image_url;

    // 2. Source-specific image
    if (article.source_id && IMAGE_CONFIG.sourceSpecific[article.source_id]) {
        return IMAGE_CONFIG.sourceSpecific[article.source_id];
    }

    // 3. Extract from content
    const contentImage = extractFirstImageFromHtml(article.content);
    if (contentImage && isValidImageUrl(contentImage)) return contentImage;

    // 4. Category-based fallback
    const category = article.category?.[0] || 'technology';
    return getCategoryImage(category);
}

function getAuthorAvatar(article) {
    if (isValidImageUrl(article.source_icon)) return article.source_icon;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(getAuthorName(article))}&background=random&size=128`;
}

// Utility Functions
function getPrimaryCategory(article) {
    const validCategories = Object.keys(IMAGE_CONFIG.defaultImages);
    if (article.category?.length > 0) {
        const firstCategory = article.category[0].toLowerCase();
        return validCategories.find(cat => firstCategory.includes(cat)) || 'technology';
    }
    return 'technology';
}

function getAuthorName(article) {
    if (!article.creator) return 'Unknown';
    return Array.isArray(article.creator) ? article.creator[0] : article.creator;
}

function getCategoryImage(category) {
    return IMAGE_CONFIG.defaultImages[category.toLowerCase()] || IMAGE_CONFIG.defaultImages.technology;
}

function isValidImageUrl(url) {
    if (!url) return false;

    // Check if it's a data URL
    if (url.startsWith('data:image/')) return true;

    // Check if it's a URL with common image extensions OR has image-like path
    return /^(https?:\/\/).*\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url) ||
        /^(https?:\/\/).*(\.(jpg|jpeg|png|gif|webp)|(image|img|photos?))(\/|\?|$)/i.test(url);
}

function extractFirstImageFromHtml(html) {
    if (!html) return null;
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
    return imgMatch ? imgMatch[1] : null;
}

function estimateReadTime(article) {
    const content = article.content || article.description || article.title;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
}