
import mongoose, { Schema, Document } from 'mongoose';

export interface ITribe extends Document {
  name: string;
  description: string;
  founder: mongoose.Types.ObjectId;
  founderName: string;
  image: string;
  coverImage?: string;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  category: string;
  tags: string[];
  location?: string;
  guidelines?: string;
  createdAt: Date;
  updatedAt: Date;
  roadmaps: mongoose.Types.ObjectId[];
  events: mongoose.Types.ObjectId[];
  isPublic: boolean;
  requiresApproval: boolean;
}

const TribeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  founder: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  founderName: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  category: { type: String, required: true },
  tags: [{ type: String }],
  location: { type: String },
  guidelines: { type: String },
  roadmaps: [{ type: Schema.Types.ObjectId, ref: 'Roadmap' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  isPublic: { type: Boolean, default: true },
  requiresApproval: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITribe>('Tribe', TribeSchema);
