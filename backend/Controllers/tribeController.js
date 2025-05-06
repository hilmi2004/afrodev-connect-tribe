import mongoose from 'mongoose';
import Tribe from "../Models/Tribe.js";
import User from "../Models/User.js";

// Debug logger with timestamp
const debug = (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [TribeController] ${message}`, data || '');
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
    if (!id || id === 'create') {
        debug('Invalid ID - empty or "create"', id);
        return false;
    }

    const isValid = mongoose.Types.ObjectId.isValid(id) &&
        (new mongoose.Types.ObjectId(id)).toString() === id;

    if (!isValid) {
        debug('Invalid ObjectId format', id);
    }

    return isValid;
};

// Standard error response
const errorResponse = (res, status, message, error = null) => {
    const response = {
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { error: error?.message })
    };

    debug(`Error ${status}: ${message}`, error);
    return res.status(status).json(response);
};

// Get all tribes
export const getAllTribes = async (req, res) => {
    const { search, tag, limit } = req.query;
    debug('getAllTribes request', { search, tag, limit });

    try {
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        if (tag && tag !== 'All Tribes') {
            query.tags = tag;
        }

        const tribes = await Tribe.find(query)
            .populate('createdBy', 'fullName profileImage')
            .populate('members', 'fullName profileImage')
            .limit(parseInt(limit) || 20);

        return res.status(200).json({
            success: true,
            count: tribes.length,
            data: tribes
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch tribes', error);
    }
};

// Create new tribe
export const createTribe = async (req, res) => {
    const { name, description, country, tags } = req.body;
    const userId = req.user._id;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    debug('createTribe request', { name, userId });

    if (!name || !description) {
        return errorResponse(res, 400, 'Name and description are required');
    }

    try {
        const tribe = new Tribe({
            name,
            description,
            country,
            tags: tags ? tags.split(',') : [],
            image,
            createdBy: userId,
            members: [userId]
        });

        const savedTribe = await tribe.save();

        // Add tribe to user's created tribes
        await User.findByIdAndUpdate(userId, {
            $addToSet: { createdTribes: savedTribe._id }
        });

        debug(`Tribe created: ${savedTribe._id}`);
        return res.status(201).json({
            success: true,
            data: savedTribe
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to create tribe', error);
    }
};

// Update tribe
export const updateTribe = async (req, res) => {
    const { id } = req.params;
    const { name, description, country, tags } = req.body;
    const userId = req.user._id;

    debug(`updateTribe request for ID: ${id}`, { name, userId });

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id);
        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        // Check if user is the creator
        if (tribe.createdBy.toString() !== userId.toString()) {
            return errorResponse(res, 403, 'Not authorized to update this tribe');
        }

        const updates = {
            name: name || tribe.name,
            description: description || tribe.description,
            country: country || tribe.country,
            tags: tags ? tags.split(',') : tribe.tags
        };

        const updatedTribe = await Tribe.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        }).populate('createdBy', 'fullName profileImage');

        return res.status(200).json({
            success: true,
            data: updatedTribe
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to update tribe', error);
    }
};

// Delete tribe
export const deleteTribe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    debug(`deleteTribe request for ID: ${id}`, { userId });

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id);
        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        // Check if user is the creator
        if (tribe.createdBy.toString() !== userId.toString()) {
            return errorResponse(res, 403, 'Not authorized to delete this tribe');
        }

        // Remove tribe from all members' joinedTribes
        await User.updateMany(
            { joinedTribes: id },
            { $pull: { joinedTribes: id } }
        );

        // Remove tribe from creator's createdTribes
        await User.findByIdAndUpdate(userId, {
            $pull: { createdTribes: id }
        });

        await Tribe.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Tribe deleted successfully'
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to delete tribe', error);
    }
};

// Get single tribe
export const getTribe = async (req, res) => {
    const { id } = req.params;
    debug(`getTribe request for ID: ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id)
            .populate('createdBy', 'fullName profileImage')
            .populate('members', 'fullName profileImage country')
            .populate('projects', 'title description');

        if (!tribe) {
            debug('Tribe not found', id);
            return errorResponse(res, 404, 'Tribe not found');
        }

        debug(`Returning tribe: ${tribe._id}`);
        return res.status(200).json({
            success: true,
            data: tribe
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch tribe', error);
    }
};

// Get tribe chat messages
export const getMessages = async (req, res) => {
    const { id } = req.params;
    debug(`getMessages request for tribe: ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id)
            .populate('chat.user', 'fullName profileImage')
            .select('chat');

        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        debug(`Returning ${tribe.chat.length} messages for tribe: ${id}`);
        return res.status(200).json({
            success: true,
            data: tribe.chat
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch messages', error);
    }
};

// Send chat message
export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    debug(`sendMessage request for tribe: ${id}`, { message, userId });

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    if (!message) {
        return errorResponse(res, 400, 'Message is required');
    }

    try {
        const newMessage = {
            user: userId,
            message,
            timestamp: new Date()
        };

        const updatedTribe = await Tribe.findByIdAndUpdate(
            id,
            { $push: { chat: newMessage } },
            { new: true }
        ).populate('chat.user', 'fullName profileImage');

        if (!updatedTribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        debug(`Message added to tribe: ${id}`);
        return res.status(200).json({
            success: true,
            data: updatedTribe.chat
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to send message', error);
    }
};

// Get tribe events
export const getEvents = async (req, res) => {
    const { id } = req.params;
    debug(`getEvents request for tribe: ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id)
            .populate('events.createdBy', 'fullName profileImage')
            .populate('events.attendees', 'fullName profileImage')
            .select('events');

        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        debug(`Returning ${tribe.events.length} events for tribe: ${id}`);
        return res.status(200).json({
            success: true,
            data: tribe.events || []
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch events', error);
    }
};

// Create tribe event
export const createEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, location, description } = req.body;
    const userId = req.user._id;

    debug(`createEvent request for tribe: ${id}`, { title, date, userId });

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    if (!title || !date) {
        return errorResponse(res, 400, 'Title and date are required');
    }

    try {
        const newEvent = {
            title,
            date,
            location: location || 'Online',
            description: description || '',
            createdBy: userId,
            attendees: [userId]
        };

        const updatedTribe = await Tribe.findByIdAndUpdate(
            id,
            { $push: { events: newEvent } },
            { new: true }
        ).populate('events.createdBy', 'fullName profileImage');

        if (!updatedTribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        const createdEvent = updatedTribe.events[updatedTribe.events.length - 1];
        debug(`Event created: ${createdEvent._id}`);

        return res.status(201).json({
            success: true,
            data: createdEvent
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to create event', error);
    }
};

// Get tribe resources
export const getResources = async (req, res) => {
    const { id } = req.params;
    debug(`getResources request for tribe: ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id)
            .populate('resources.createdBy', 'fullName profileImage')
            .select('resources');

        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        debug(`Returning ${tribe.resources.length} resources for tribe: ${id}`);
        return res.status(200).json({
            success: true,
            data: tribe.resources || []
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch resources', error);
    }
};

// Add tribe resource
export const addResource = async (req, res) => {
    const { id } = req.params;
    const { title, type, description } = req.body;
    const userId = req.user._id;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    debug(`addResource request for tribe: ${id}`, { title, type, fileUrl });

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    if (!title || !type) {
        return errorResponse(res, 400, 'Title and type are required');
    }

    try {
        const newResource = {
            title,
            type,
            description: description || '',
            createdBy: userId,
            fileUrl
        };

        const updatedTribe = await Tribe.findByIdAndUpdate(
            id,
            { $push: { resources: newResource } },
            { new: true }
        ).populate('resources.createdBy', 'fullName profileImage');

        if (!updatedTribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        const createdResource = updatedTribe.resources[updatedTribe.resources.length - 1];
        debug(`Resource added: ${createdResource._id}`);

        return res.status(201).json({
            success: true,
            data: createdResource
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to add resource', error);
    }
};

// Join tribe
export const joinTribe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    debug(`joinTribe request - User ${userId} joining tribe ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id);
        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        if (tribe.members.includes(userId)) {
            return errorResponse(res, 400, 'Already a member of this tribe');
        }

        await Tribe.findByIdAndUpdate(id, { $addToSet: { members: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { joinedTribes: id } });

        debug(`User ${userId} joined tribe ${id}`);
        return res.status(200).json({
            success: true,
            message: 'Successfully joined tribe'
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to join tribe', error);
    }
};

// Leave tribe
export const leaveTribe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    debug(`leaveTribe request - User ${userId} leaving tribe ${id}`);

    if (!isValidObjectId(id)) {
        return errorResponse(res, 400, 'Invalid tribe ID format');
    }

    try {
        const tribe = await Tribe.findById(id);
        if (!tribe) {
            return errorResponse(res, 404, 'Tribe not found');
        }

        if (!tribe.members.includes(userId)) {
            return errorResponse(res, 400, 'Not a member of this tribe');
        }

        await Tribe.findByIdAndUpdate(id, { $pull: { members: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { joinedTribes: id } });

        debug(`User ${userId} left tribe ${id}`);
        return res.status(200).json({
            success: true,
            message: 'Successfully left tribe'
        });

    } catch (error) {
        return errorResponse(res, 500, 'Failed to leave tribe', error);
    }
};