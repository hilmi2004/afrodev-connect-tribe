
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  authorName: string;
  authorImage?: string;
  parentId?: mongoose.Types.ObjectId; // Used for replies
  entityType: 'roadmap' | 'project' | 'event' | 'post';
  entityId: mongoose.Types.ObjectId;
  likes: number;
  likedByUsers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
}

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorImage: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  entityType: { 
    type: String, 
    enum: ['roadmap', 'project', 'event', 'post'],
    required: true
  },
  entityId: { 
    type: Schema.Types.ObjectId, 
    required: true,
    refPath: 'entityType'
  },
  likes: { type: Number, default: 0 },
  likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isEdited: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
