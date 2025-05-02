// models/FlaggedContent.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FlaggedContentSchema = new Schema({
    reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: {
        type: String,
        enum: ["project", "user", "tribe", "comment"],
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "targetType" // Dynamic reference
    },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    },
    assignedModerator: { type: Schema.Types.ObjectId, ref: "User" }, // Optional
    resolvedAt: { type: Date }
}, { timestamps: true });

const FlaggedContent = mongoose.model("FlaggedContent", FlaggedContentSchema);
export default FlaggedContent;