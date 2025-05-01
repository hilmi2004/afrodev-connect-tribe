
import mongoose, { Schema, Document } from 'mongoose';

interface Link {
  title: string;
  url: string;
}

interface RoadmapStep extends Document {
  id: number | string;
  title: string;
  description: string;
  tags: string[];
  links: Link[];
  children?: RoadmapStep[];
  order?: number;
  completedByUsers?: mongoose.Types.ObjectId[];
}

export interface IRoadmap extends Document {
  id: string;
  title: string;
  description: string;
  author: mongoose.Types.ObjectId;
  authorName: string;
  steps: RoadmapStep[];
  likes: number;
  downloads: number;
  image?: string;
  category?: string;
  tags?: string[];
  difficulty?: string;
  estimatedTimeToComplete?: string;
  createdAt: Date;
  updatedAt: Date;
  likedByUsers: mongoose.Types.ObjectId[];
  savedByUsers: mongoose.Types.ObjectId[];
  visibility: 'public' | 'private' | 'tribe';
  tribeId?: mongoose.Types.ObjectId;
}

const LinkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});

const RoadmapStepSchema = new Schema({
  id: { type: Schema.Types.Mixed, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  links: [LinkSchema],
  children: [{ type: Schema.Types.Mixed, ref: 'this' }],
  order: { type: Number },
  completedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const RoadmapSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  steps: [RoadmapStepSchema],
  likes: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  image: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  difficulty: { type: String },
  estimatedTimeToComplete: { type: String },
  likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  savedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  visibility: { 
    type: String, 
    enum: ['public', 'private', 'tribe'],
    default: 'public'
  },
  tribeId: { type: Schema.Types.ObjectId, ref: 'Tribe' }
}, { timestamps: true });

export default mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
