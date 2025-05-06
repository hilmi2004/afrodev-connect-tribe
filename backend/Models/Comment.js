// models/Comment.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    targetType: {
        type: String,
        enum: ["project", "article"],
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "targetType"
    },
    replies: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        content: String,
        isCreator: Boolean,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;