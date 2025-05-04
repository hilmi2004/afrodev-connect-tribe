
import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  authorName: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  readTime: number;
  likes: number;
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  isPromoted: boolean;
  views: number;
}

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String },
  tags: [{ type: String }],
  category: { type: String, required: true },
  readTime: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  isPromoted: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

// Create a text index for search functionality
ArticleSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text',
  category: 'text'
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
