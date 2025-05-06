// userRoutes.js
import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
    getUserProfile,
    updateUserProfile,
    getUserProjects,
    getUserTribes,
    getUserTimeline,
    addTimelineEvent
} from '../controllers/userController.js';
import User from "../Models/User.js"

const router = express.Router();

router.post('/:id/test-languages', protect, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { languages: ["test1", "test2"] } },
            { new: true }
        );
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.get('/:id/projects', protect, getUserProjects);
router.get('/:id/tribes', protect, getUserTribes);
router.get('/:id/timeline', protect, getUserTimeline);
router.post('/:id/timeline', protect, addTimelineEvent);

export default router;