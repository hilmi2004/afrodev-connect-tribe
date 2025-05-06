import express from 'express';
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} from '../controllers/followController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/follow/:userId', protect, followUser);
router.post('/unfollow/:userId', protect, unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);

export default router;