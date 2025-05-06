import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    getProjectContributors,
    likeProject,
    unlikeProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', protect, createProject);
router.get('/:id', getProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.get('/:id/contributors', getProjectContributors);
router.post('/:id/like', protect, likeProject);
router.post('/:id/unlike', protect, unlikeProject);

export default router;