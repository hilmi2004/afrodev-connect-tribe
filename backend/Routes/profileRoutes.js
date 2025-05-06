import express from 'express';
import { protect } from '../Middlewares/auth.js';
import {
    getProfile,
    updateProfile,
    updateProfileImage
} from '../controllers/profileController.js';
import {uploadSingleImage} from "../Middlewares/upload.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/image', protect, uploadSingleImage, updateProfileImage); // Add middleware here

export default router;