// backend/routes/commentRoutes.js
import express from 'express';
import {
    createComment,
    addReply,
    getComments
} from '../controllers/commentController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, createComment);
router.post('/:commentId/reply', protect, addReply);
router.get('/', getComments);

export { router as commentRoutes };  // Named export instead of default