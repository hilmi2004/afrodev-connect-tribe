import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
    getUserProfile,
    updateUserProfile,
    getUserProjects,
    getUserTribes
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.get('/:id/projects', protect, getUserProjects);
router.get('/:id/tribes', protect, getUserTribes);

export default router;