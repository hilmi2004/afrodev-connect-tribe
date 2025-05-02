// models/Project.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

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

const Project = mongoose.model('Project', ProjectSchema);
export default Project;