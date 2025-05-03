import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
    createTribe,
    getTribe,
    updateTribe,
    deleteTribe,
    joinTribe,
    leaveTribe,
    getTribeMembers,
    getTribeProjects
} from '../controllers/tribeController.js';

const router = express.Router();

router.post('/', protect, createTribe);
router.get('/:id', protect, getTribe);
router.put('/:id', protect, updateTribe);
router.delete('/:id', protect, deleteTribe);
router.post('/:id/join', protect, joinTribe);
router.post('/:id/leave', protect, leaveTribe);
router.get('/:id/members', protect, getTribeMembers);
router.get('/:id/projects', protect, getTribeProjects);

export default router;