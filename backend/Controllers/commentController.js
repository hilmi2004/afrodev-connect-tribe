// backend/controllers/commentController.js
import Comment from "../Models/Comment.js"
// import Project from '../models/Project.js';
import Article from '../models/Article.js';
import {Project} from "../Models/index.js";

export const createComment = async (req, res) => {
    try {
        const { content, targetType, targetId } = req.body;
        const userId = req.user.id;

        // Validate target exists
        let target;
        if (targetType === 'project') {
            target = await Project.findById(targetId);
        } else if (targetType === 'article') {
            target = await Article.findById(targetId);
        }

        if (!target) {
            return res.status(404).json({
                success: false,
                message: 'Target not found'
            });
        }

        const newComment = new Comment({
            user: userId,
            content,
            targetType,
            targetId
        });

        await newComment.save();

        // Increment comment count on the target
        if (targetType === 'project') {
            await Project.findByIdAndUpdate(targetId, { $inc: { comments: 1 } });
        } else if (targetType === 'article') {
            await Article.findByIdAndUpdate(targetId, { $inc: { comments: 1 } });
        }

        // Populate user data before sending response
        const populatedComment = await Comment.findById(newComment._id)
            .populate('user', 'fullName profileImage');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: populatedComment
        });

    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when creating comment'
        });
    }
};

export const addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        // Check if the user is the creator of the target
        let isCreator = false;
        if (comment.targetType === 'project') {
            const project = await Project.findById(comment.targetId);
            isCreator = project?.creator.toString() === userId;
        } else if (comment.targetType === 'article') {
            const article = await Article.findById(comment.targetId);
            isCreator = article?.author.toString() === userId;
        }

        const newReply = {
            user: userId,
            content,
            isCreator
        };

        comment.replies.push(newReply);
        await comment.save();

        // Populate user data in the reply before sending response
        const populatedComment = await Comment.findById(comment._id)
            .populate('user', 'fullName profileImage')
            .populate('replies.user', 'fullName profileImage');

        res.status(201).json({
            success: true,
            message: 'Reply added successfully',
            reply: populatedComment.replies[populatedComment.replies.length - 1]
        });

    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when adding reply'
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { targetType, targetId } = req.query;

        if (!targetType || !targetId) {
            return res.status(400).json({
                success: false,
                message: 'targetType and targetId are required'
            });
        }

        const comments = await Comment.find({ targetType, targetId })
            .populate('user', 'fullName profileImage')
            .populate('replies.user', 'fullName profileImage')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            comments
        });

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when fetching comments'
        });
    }
};