
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Generate JWT Token
// Generate JWT Token (simplified)
const generateToken = (userId) => {
    return jwt.sign(
        { userId }, // No fingerprint in payload
        process.env.JWT_SECRET || 'fallbacksecretfordevonly',
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const {
            fullName,
            email,
            password,
            country,
            experience,
            programmingLanguages,
            startYear,
            learningStyle,
            interests,
            careerGoals,
            communicationPreference,
            githubUsername,
            referralSource,
            platformGoals,
            preferredCommunication,
            timeZone,
            workStyle,
            meetupInterest,
            mentorInterest,
            expectationsFromPlatform,
            agreedToTerms,
        } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate terms agreement
        if (!agreedToTerms) {
            return res.status(400).json({ success: false, message: 'You must agree to the terms' });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            country,
            experience,
            programmingLanguages: programmingLanguages || [],
            startYear,
            learningStyle,
            interests: interests || [],
            careerGoals,
            communicationPreference,
            githubUsername,
            referralSource,
            platformGoals: platformGoals || [],
            preferredCommunication,
            timeZone,
            workStyle,
            meetupInterest: meetupInterest || false,
            mentorInterest,
            expectationsFromPlatform,
            agreedToTerms
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role,
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role,
                country:user.country,
                interests:user.interests,
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('joinedTribes', 'name description')
            .populate('createdRoadmaps', 'title description')
            .populate('savedRoadmaps', 'title description');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/update
// @access  Private
export const updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const options = { new: true, runValidators: true };

        // Prevent role updates unless admin
        if (req.user.role !== 'admin' && updates.role) {
            return res.status(403).json({ success: false, message: 'Not authorized to update role' });
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, options)
            .select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
