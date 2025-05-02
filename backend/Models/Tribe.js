// models/Tribe.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TribeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String },
    tags: [{ type: String }], // e.g., ["Web Dev", "Nairobi"]
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    chat: [{
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Tribe = mongoose.model("Tribe", TribeSchema);
export default Tribe;