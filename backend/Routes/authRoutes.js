
import express from 'express';
import {
    registerUser,
    loginUser,
    getMe,
    updateUser
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
import { validateRegisterInput, validateLoginInput } from '../middlewares/validate.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);

export default router;
