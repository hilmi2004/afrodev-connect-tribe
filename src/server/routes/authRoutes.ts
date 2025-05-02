
import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user route (protected)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
