import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String },
    tags: [{ type: String }],
    category: { type: String, required: true },
    readTime: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    isPromoted: { type: Boolean, default: false },
    views: { type: Number, default: 0 }
}, {
    timestamps: true
});

// Create a text index for search functionality
ArticleSchema.index({
    title: 'text',
    content: 'text',
    tags: 'text',
    category: 'text'
});

// Prevent model overwrite in case of hot-reloading
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export default Article;
