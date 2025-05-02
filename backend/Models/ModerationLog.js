// models/ModerationLog.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ModerationLogSchema = new Schema({
    moderatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
        type: String,
        enum: ["delete", "suspend", "warn", "feature"],
        required: true
    },
    targetType: {
        type: String,
        enum: ["project", "user", "tribe", "comment"],
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "targetType"
    },
    reason: { type: String },
}, { timestamps: true });

const ModerationLog = mongoose.model("ModerationLog", ModerationLogSchema);
export default ModerationLog;