
import mongoose, { Model, Document, Schema } from 'mongoose';

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

// Create a schema for User
const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  profileImage: { type: String },
  techStack: [{ type: String }],
  expertiseLevel: { type: String, required: true },
  bio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  website: { type: String },
  twitter: { type: String },
  profession: { type: String, required: true },
  interests: [{ type: String }],
  roles: [{ type: String }],
  collaborationPreferences: {
    preferredTeamSize: { type: String },
    communicationStyle: [{ type: String }],
    availability: { type: String },
    learningStyle: { type: String },
    workStyle: [{ type: String }]
  },
  experiences: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    current: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }]
}, { timestamps: true });

// This type is for the model with static methods
interface IUserModel extends Model<IUser & Document> {
  // Add any static methods here if needed
}

// Create the User model and cast it to the interface
const UserModel = mongoose.model<IUser & Document, IUserModel>('User', UserSchema);

export { UserModel };
