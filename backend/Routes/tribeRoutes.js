// routes/tribeRoutes.js
import express from 'express';
import {
    getTribe,
    getAllTribes,
    createTribe,
    updateTribe,
    deleteTribe,
    joinTribe,
    leaveTribe,
    getMessages,
    sendMessage,
    getEvents,
    createEvent,
    getResources,
    addResource
} from '../Controllers/tribeController.js';
import { protect } from '../Middlewares/auth.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// GET /api/tribes - Get all tribes
// POST /api/tribes - Create new tribe
router.route('/')
    .get(getAllTribes)
    .post(protect, upload.single('image'), createTribe);

// GET /api/tribes/:id - Get single tribe
// PUT /api/tribes/:id - Update tribe
// DELETE /api/tribes/:id - Delete tribe
router.route('/:id')
    .get(getTribe)
    .put(protect, updateTribe)
    .delete(protect, deleteTribe);

// POST /api/tribes/:id/join - Join tribe
router.post('/:id/join', protect, joinTribe);

// POST /api/tribes/:id/leave - Leave tribe
router.post('/:id/leave', protect, leaveTribe);

// GET /api/tribes/:id/chat - Get tribe messages
// POST /api/tribes/:id/chat - Send message
router.route('/:id/chat')
    .get(getMessages)
    .post(protect, sendMessage);

// GET /api/tribes/:id/events - Get tribe events
// POST /api/tribes/:id/events - Create event
router.route('/:id/events')
    .get(getEvents)
    .post(protect, createEvent);

// GET /api/tribes/:id/resources - Get tribe resources
// POST /api/tribes/:id/resources - Add resource
router.route('/:id/resources')
    .get(getResources)
    .post(protect, upload.single('file'), addResource);

export default router;