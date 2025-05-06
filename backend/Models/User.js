import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    experience: [{
        title: String,
        company: String,
        period: String,
        description: String
    }],
    education: [{
        degree: { type: String },
        institution: { type: String },
        year: { type: String }
    }],
    programmingLanguages: [{ type: String }],
    languages: {
        type: [String],
        default: [],
        set: function(langs) {
            // Convert to array and remove duplicates
            return [...new Set(
                Array.isArray(langs)
                    ? langs.map(String).filter(l => l.trim())
                    : []
            )];
        }
    },
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
    joinedTribes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tribe' }],
    createdRoadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' }],
    savedRoadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.path('languages').validate(function(value) {
    console.log('Validating languages:', value);
    return true; // Temporarily bypass validation
});

// Prevent model overwrite in case of hot-reloading
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;