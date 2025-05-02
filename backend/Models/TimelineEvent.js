// models/TimelineEvent.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TimelineEventSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, // e.g., "Completed AWS Certification"
    type: {
        type: String,
        enum: ["bootcamp", "certification", "job", "project-launch"],
        required: true
    },
    date: { type: Date, required: true },
    description: { type: String },
    link: { type: String } // Optional URL
});

const TimelineEvent = mongoose.model("TimelineEvent", TimelineEventSchema);
export default TimelineEvent;