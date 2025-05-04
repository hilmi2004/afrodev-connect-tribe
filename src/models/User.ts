
import mongoose, { Model, Document } from 'mongoose';

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  country: string;
  yearsOfExperience: number;
  profileImage?: string;
  techStack: string[];
  expertiseLevel: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
  profession: string;
  interests: string[];
  roles: string[];
  collaborationPreferences: {
    preferredTeamSize?: string;
    communicationStyle?: string[];
    availability?: string;
    learningStyle?: string;
    workStyle?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
  experiences?: {
    title: string;
    company: string;
    location?: string;
    current: boolean;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];
}

// This represents the MongoDB document
interface IUserDocument extends IUser, Document {}

// This type is for the model with static methods
interface IUserModel extends Model<IUserDocument> {
  // Add any static methods here if needed
}

// Create your User model and cast it to your interface
const UserModel = mongoose.model<IUserDocument, IUserModel>('User') as unknown as Model<IUser>;

export { UserModel };
