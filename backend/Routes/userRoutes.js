
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

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.get('/:id/projects', protect, getUserProjects);
router.get('/:id/tribes', protect, getUserTribes);
router.get('/:id/timeline', protect, getUserTimeline);
router.post('/:id/timeline', protect, addTimelineEvent);

export default router;
