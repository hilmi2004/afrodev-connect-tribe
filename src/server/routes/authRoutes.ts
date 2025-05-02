
import express, { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

export default router;
