// utils/slugGenerator.js
import Article from '../models/Article.js';

export const generateSlug = async (title) => {
    let slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-') // Replace multiple - with single -
        .trim();

    // Check if slug exists
    const existing = await Article.findOne({ slug });
    if (existing) {
        const random = Math.floor(Math.random() * 10000);
        slug = `${slug}-${random}`;
    }

    return slug;
};