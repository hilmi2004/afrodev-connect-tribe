
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  tribeId: mongoose.Types.ObjectId;
  channelId?: string;
  sender: mongoose.Types.ObjectId;
  senderName: string;
  senderImage?: string;
  content: string;
  attachments?: string[];
  mentions?: mongoose.Types.ObjectId[];
  reactions?: {
    emoji: string;
    users: mongoose.Types.ObjectId[];
  }[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  parentMessage?: mongoose.Types.ObjectId;
  threadReplies?: mongoose.Types.ObjectId[];
  isPinned: boolean;
}

const MessageSchema = new Schema({
  tribeId: { type: Schema.Types.ObjectId, ref: 'Tribe', required: true },
  channelId: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  senderImage: { type: String },
  content: { type: String, required: true },
  attachments: [{ type: String }],
  mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  reactions: [{
    emoji: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }],
  isEdited: { type: Boolean, default: false },
  parentMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  threadReplies: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  isPinned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
