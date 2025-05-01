
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  creatorName: string;
  eventType: 'meetup' | 'webinar' | 'hackathon' | 'workshop';
  startDate: Date;
  endDate: Date;
  location?: {
    online: boolean;
    platform?: string;
    meetingLink?: string;
    physicalAddress?: string;
    city?: string;
    country?: string;
  };
  image?: string;
  capacity?: number;
  attendees: mongoose.Types.ObjectId[];
  interested: mongoose.Types.ObjectId[];
  tags: string[];
  tribeId?: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: String, required: true },
  eventType: { 
    type: String, 
    enum: ['meetup', 'webinar', 'hackathon', 'workshop'],
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: {
    online: { type: Boolean, default: true },
    platform: { type: String },
    meetingLink: { type: String },
    physicalAddress: { type: String },
    city: { type: String },
    country: { type: String }
  },
  image: { type: String },
  capacity: { type: Number },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  interested: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tags: [{ type: String }],
  tribeId: { type: Schema.Types.ObjectId, ref: 'Tribe' },
  isPublic: { type: Boolean, default: true },
  resources: [{
    title: { type: String },
    url: { type: String },
    type: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
