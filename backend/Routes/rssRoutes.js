import express from 'express';
import { parseRSSFeed } from '../controllers/rssController.js';

const router = express.Router();

router.get('/parse', parseRSSFeed);

export default router;