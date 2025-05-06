import Parser from 'rss-parser';
import NewsArticle from '../models/NewsArticle.js';

// Feed Configuration
const FEED_CONFIG = {
    sources: [
        {
            name: 'Techpoint Africa',
            url: 'https://techpoint.africa/feed/',
            backupUrl: 'https://techpoint.africa/feed.xml',
            defaultImage: 'https://techpoint.africa/wp-content/uploads/2018/07/techpoint-logo.png'
        },
        {
            name: 'Disrupt Africa',
            url: 'https://www.disrupt-africa.com/feed/',
            backupUrl: 'https://www.disrupt-africa.com/feed.xml',
            defaultImage: 'https://www.disrupt-africa.com/wp-content/uploads/2015/12/disrupt-africa-logo.png'
        },
        {
            name: 'TechCabal',
            url: 'https://techcabal.com/feed/',
            backupUrl: 'https://techcabal.com/feed.xml',
            defaultImage: 'https://techcabal.com/wp-content/uploads/2020/05/cropped-techcabal-favicon-512x512-1-32x32.png'
        }
    ],
    categories: {
        technology: ['tech', 'technology', 'innovation'],
        business: ['business', 'finance', 'economy'],
        startups: ['startup', 'venture', 'funding']
    }
};

// Configure parser
const parser = new Parser({
    timeout: 20000,
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml',
            'Accept-Encoding': 'gzip, deflate'
        }
    }
});

export const fetchAndStoreRSSArticles = async () => {
    const savedArticles = [];
    const processingStats = { totalProcessed: 0, saved: 0, skipped: 0, errors: 0 };

    for (const feed of FEED_CONFIG.sources) {
        try {
            console.log(`Fetching RSS feed: ${feed.name}`);

            let parsedFeed;
            try {
                parsedFeed = await parser.parseURL(feed.url);
            } catch (primaryError) {
                console.warn(`Primary feed failed (${feed.url}), trying backup: ${feed.backupUrl}`);
                try {
                    parsedFeed = await parser.parseURL(feed.backupUrl);
                } catch (backupError) {
                    console.error(`Both feed URLs failed for ${feed.name}:`, backupError.message);
                    continue;
                }
            }

            // Process feed items
            for (const item of parsedFeed.items.slice(0, 15)) {
                processingStats.totalProcessed++;
                try {
                    if (!item.title || !item.link) {
                        processingStats.skipped++;
                        continue;
                    }

                    // Check for existing article
                    const existing = await NewsArticle.findOne({
                        url: item.link,
                        sourceType: 'rss'
                    });

                    if (existing) {
                        processingStats.skipped++;
                        continue;
                    }

                    // Determine category
                    const category = determineCategory(item);

                    // Create and save new article
                    const newArticle = new NewsArticle({
                        source: parsedFeed.title || feed.name,
                        sourceType: 'rss',
                        title: item.title,
                        excerpt: item.contentSnippet || item.title.substring(0, 150) + '...',
                        content: sanitizeContent(item.content || ''),
                        imageUrl: extractBestImage(item, feed.defaultImage),
                        category,
                        publishDate: new Date(item.isoDate || item.pubDate || Date.now()),
                        readTime: estimateReadTime(item),
                        author: {
                            name: getItemAuthor(item, parsedFeed.title),
                            avatar: getAuthorAvatar(item)
                        },
                        url: item.link,
                        featured: shouldFeatureArticle(item)
                    });

                    await newArticle.save();
                    savedArticles.push(newArticle);
                    processingStats.saved++;

                    console.log(`Saved RSS article: ${item.title.substring(0, 50)}... [${category}]`);

                } catch (itemError) {
                    processingStats.errors++;
                    console.error(`Error processing item from ${feed.name}:`, itemError.message);
                }
            }
        } catch (feedError) {
            processingStats.errors++;
            console.error(`Critical error with ${feed.name}:`, feedError.message);
        }
    }

    console.log(`RSS Processing Complete:
        - Total Processed: ${processingStats.totalProcessed}
        - Saved: ${processingStats.saved}
        - Skipped: ${processingStats.skipped}
        - Errors: ${processingStats.errors}`);

    return savedArticles;
};

// Image Processing Functions
function extractBestImage(item, feedDefault) {
    // Priority 1: Media content
    if (item.media?.content?.url && isValidImageUrl(item.media.content.url)) {
        return item.media.content.url;
    }

    // Priority 2: Enclosure
    if (item.enclosure?.url && isValidImageUrl(item.enclosure.url)) {
        return item.enclosure.url;
    }

    // Priority 3: Content extraction
    const contentImage = extractFirstImageFromHtml(item.content);
    if (contentImage && isValidImageUrl(contentImage)) return contentImage;

    // Priority 4: WordPress featured image
    if (item['wp:featuredimage'] && isValidImageUrl(item['wp:featuredimage'])) {
        return item['wp:featuredimage'];
    }

    // Priority 5: Feed default
    return feedDefault || getDefaultTechImage();
}

// Add this helper function
function getDefaultTechImage() {
    return 'https://images.unsplash.com/photo-1553484771-371a605b060b';
}

// Content Helpers
function sanitizeContent(html) {
    if (!html) return '';
    // Basic sanitization - remove scripts and excessive whitespace
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function determineCategory(item) {
    const categories = item.categories || [];
    const title = item.title?.toLowerCase() || '';
    const content = item.contentSnippet?.toLowerCase() || '';

    for (const [category, keywords] of Object.entries(FEED_CONFIG.categories)) {
        const hasCategoryKeyword = keywords.some(keyword =>
            categories.some(cat => cat.toLowerCase().includes(keyword)) ||
            title.includes(keyword) ||
            content.includes(keyword)
        );
        if (hasCategoryKeyword) return category;
    }

    return 'technology'; // Default category
}

// Author Handling
function getItemAuthor(item, feedTitle) {
    if (item.creator) return item.creator;
    if (item.author) return item.author;
    return feedTitle || 'Unknown';
}

function getAuthorAvatar(item) {
    // Try to extract from content
    const avatarMatch = item.content?.match(/<img[^>]+class="[^"]*avatar[^"]*"[^>]+src="([^">]+)"/i);
    if (avatarMatch && isValidImageUrl(avatarMatch[1])) return avatarMatch[1];

    // Fallback to generated avatar
    const authorName = getItemAuthor(item);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&size=128`;
}

// Utility Functions
function isValidImageUrl(url) {
    return url && /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
}

function extractFirstImageFromHtml(html) {
    if (!html) return null;
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
    return imgMatch ? imgMatch[1] : null;
}

function estimateReadTime(item) {
    const text = item.contentSnippet || item.title || '';
    const words = text.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function shouldFeatureArticle(item) {
    // Feature articles with certain keywords or from important sources
    const featuredKeywords = ['exclusive', 'breaking', 'interview'];
    return featuredKeywords.some(keyword =>
        item.title?.toLowerCase().includes(keyword) ||
        item.categories?.some(cat => cat.toLowerCase().includes(keyword))
    );
}