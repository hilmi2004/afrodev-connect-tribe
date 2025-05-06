// models/Tribe.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const resourceSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: String,
    fileUrl: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const TribeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String },
    tags: [{ type: String }],
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    chat: [{
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    events: [eventSchema],
    resources: [resourceSchema],
    createdAt: { type: Date, default: Date.now }
});

const Tribe = mongoose.model("Tribe", TribeSchema);
export default Tribe;