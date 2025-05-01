
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string; // This should be hashed!
  country: string;
  experience: string;
  programmingLanguages: string[];
  startYear: string;
  learningStyle: string;
  interests: string[];
  careerGoals: string;
  communicationPreference: string;
  githubUsername?: string;
  referralSource: string;
  platformGoals: string[];
  preferredCommunication: string;
  timeZone: string;
  workStyle: string;
  meetupInterest: boolean;
  mentorInterest: string;
  expectationsFromPlatform: string;
  agreedToTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  joinedTribes: mongoose.Types.ObjectId[];
  createdRoadmaps: mongoose.Types.ObjectId[];
  savedRoadmaps: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  experience: { type: String, required: true },
  programmingLanguages: [{ type: String }],
  startYear: { type: String },
  learningStyle: { type: String },
  interests: [{ type: String }],
  careerGoals: { type: String },
  communicationPreference: { type: String, default: 'email' },
  githubUsername: { type: String },
  referralSource: { type: String },
  platformGoals: [{ type: String }],
  preferredCommunication: { type: String, default: 'asynchronous' },
  timeZone: { type: String },
  workStyle: { type: String },
  meetupInterest: { type: Boolean, default: false },
  mentorInterest: { type: String, default: 'both' },
  expectationsFromPlatform: { type: String },
  agreedToTerms: { type: Boolean, required: true },
  profileImage: { type: String },
  bio: { type: String },
  socialLinks: {
    twitter: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String }
  },
  joinedTribes: [{ type: Schema.Types.ObjectId, ref: 'Tribe' }],
  createdRoadmaps: [{ type: Schema.Types.ObjectId, ref: 'Roadmap' }],
  savedRoadmaps: [{ type: Schema.Types.ObjectId, ref: 'Roadmap' }]
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
