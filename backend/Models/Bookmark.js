// models/Bookmark.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    createdAt: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
export default Bookmark;