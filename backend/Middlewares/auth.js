
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Protect routes
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbacksecretfordevonly');

        // Get user from token
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

// Role authorization
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

// Check ownership or admin
export const checkOwnership = (modelName) => {
    return async (req, res, next) => {
        try {
            const resource = await mongoose.model(modelName).findById(req.params.id);

            if (!resource) {
                return res.status(404).json({ success: false, message: 'Resource not found' });
            }

            // Check if user is owner or admin
            if (
                resource.user && 
                resource.user.toString() !== req.user.id &&
                req.user.role !== 'admin'
            ) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to modify this resource'
                });
            }

            next();
        } catch (err) {
            console.error('Ownership check error:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };
};
