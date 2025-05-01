
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  creatorName: string;
  image?: string;
  repoUrl?: string;
  demoUrl?: string;
  techStack: string[];
  contributors: mongoose.Types.ObjectId[];
  category: string;
  status: 'idea' | 'in-progress' | 'completed' | 'seeking-help';
  lookingForContributors: boolean;
  likes: number;
  tags: string[];
  tribeId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  likedByUsers: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: String, required: true },
  image: { type: String },
  repoUrl: { type: String },
  demoUrl: { type: String },
  techStack: [{ type: String }],
  contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  category: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['idea', 'in-progress', 'completed', 'seeking-help'],
    default: 'idea'
  },
  lookingForContributors: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }],
  tribeId: { type: Schema.Types.ObjectId, ref: 'Tribe' },
  likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
