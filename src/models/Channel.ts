
import mongoose, { Schema, Document } from 'mongoose';

export interface IChannel extends Document {
  tribeId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  type: 'text' | 'voice' | 'announcement';
  createdBy: mongoose.Types.ObjectId;
  moderators: mongoose.Types.ObjectId[];
  isPrivate: boolean;
  allowedUsers?: mongoose.Types.ObjectId[];
  pinnedMessages: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChannelSchema = new Schema({
  tribeId: { type: Schema.Types.ObjectId, ref: 'Tribe', required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['text', 'voice', 'announcement'],
    default: 'text' 
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  moderators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isPrivate: { type: Boolean, default: false },
  allowedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pinnedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, { timestamps: true });

export default mongoose.model<IChannel>('Channel', ChannelSchema);
