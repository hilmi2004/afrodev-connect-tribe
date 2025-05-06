// types/tribe.ts
export interface TribeMember {
    _id: string;
    fullName: string;
    profileImage?: string;
    country?: string;
    role?: 'member' | 'admin' | 'creator';
}

export interface TribeEvent {
    _id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    createdBy: TribeMember | string; // Can be ID or populated object
    attendees: string[]; // Array of user IDs
}

export interface TribeResource {
    _id: string;
    title: string;
    type: 'document' | 'link' | 'video';
    url: string;
    description?: string;
    uploadedBy: TribeMember | string; // Can be ID or populated object
    createdAt: string | Date;
}

export interface TribeMessage {
    _id: string;
    user: TribeMember;
    message: string;
    timestamp: string;
}

export interface Tribe {
    _id: string;
    name: string;
    description: string;
    country?: string;
    tags: string[];
    image?: string;
    members: TribeMember[];
    createdBy: TribeMember;
    chat?: TribeMessage[];
    events?: TribeEvent[];
    resources?: TribeResource[];
    createdAt: string;
    updatedAt: string;
}

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

// User Education Type
interface Education {
    degree: string;
    institution: string;
    year: string;
}

export interface User {
    _id: string;
    email: string;
    fullName: string;
    profileImage?: string;
    country?: string;
    bio?: string;
    role?: 'user' | 'moderator' | 'admin';
    experience?: Experience[];
    education?: Education[];
    programmingLanguages?: string[];
    languages?: string[];
    startYear?: string;
    learningStyle?: string;
    interests?: string[];
    careerGoals?: string;
    communicationPreference?: string;
    githubUsername?: string;
    referralSource?: string;
    platformGoals?: string[];
    preferredCommunication?: string;
    timeZone?: string;
    workStyle?: string;
    meetupInterest?: boolean;
    mentorInterest?: string;
    expectationsFromPlatform?: string;
    agreedToTerms?: boolean;
    socialLinks?: SocialLinks;
    joinedTribes?: string[];
    createdTribes?: string[];
    savedRoadmaps?: string[];
    followers?: string[];
    following?: string[];
}

interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}