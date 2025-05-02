// models/Like.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: {
        type: String,
        enum: ["project", "comment"],
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "targetType" // Dynamic reference
    },
    createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", LikeSchema);
export default Like;