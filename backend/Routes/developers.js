// backend/routes/developers.js
import express from 'express';
import connectDB from '../config/db.js';
import {searchDevelopers} from "../../src/services/developerService.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await connectDB();
        const result = await searchDevelopers(req.query);
        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;