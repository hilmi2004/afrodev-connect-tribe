import mongoose from 'mongoose';

const NewsArticleSchema = new mongoose.Schema({
    source: { type: String, required: true },
    sourceType: { type: String, enum: ['newsdata', 'rss', 'manual'], required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1553484771-371a605b060b'
    },
    category: { type: String, required: true },
    publishDate: { type: Date, required: true },
    readTime: { type: String },
    author: {
        name: { type: String },
        avatar: { type: String }
    },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    url: { type: String, required: true },
    country: { type: String },
    metadata: { type: Object }
}, { timestamps: true });

// Indexes for faster querying
NewsArticleSchema.index({ title: 'text', excerpt: 'text', category: 'text' });
NewsArticleSchema.index({ featured: 1, trending: 1 });
NewsArticleSchema.index({ publishDate: -1 });

const NewsArticle = mongoose.models.NewsArticle || mongoose.model('NewsArticle', NewsArticleSchema);

export default NewsArticle;