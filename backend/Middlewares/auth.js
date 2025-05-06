import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { promisify } from 'util';

// Promisify jwt.verify
const verifyToken = promisify(jwt.verify);

// Protect routes - verify JWT (simplified version without fingerprint)
export const protect = async (req, res, next) => {
    try {
        let token;

        // 1) Check for token in headers or cookies
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // 2) Verify token
        const decoded = await verifyToken(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.userId).select('+passwordChangedAt');
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exists.'
            });
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.passwordChangedAt) {
            const changedTimestamp = parseInt(
                currentUser.passwordChangedAt.getTime() / 1000,
                10
            );

            if (decoded.iat < changedTimestamp) {
                return res.status(401).json({
                    success: false,
                    message: 'User recently changed password! Please log in again.'
                });
            }
        }

        // 5) Grant access to protected route
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    } catch (err) {
        console.error('🔒 Authentication error:', err.message);

        // Handle specific JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again!'
            });
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Your token has expired! Please log in again.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An error occurred during authentication'
        });
    }
};

// Role-based authorization
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

// Resource ownership check
export const checkOwnership = (modelName, idParam = 'id') => {
    return async (req, res, next) => {
        try {
            const resource = await mongoose.model(modelName).findById(req.params[idParam]);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    message: `${modelName} not found`
                });
            }

            // Check ownership (supports both 'user' and 'createdBy' references)
            const ownerField = resource.user ? 'user' : resource.createdBy ? 'createdBy' : null;

            if (!ownerField) {
                return res.status(403).json({
                    success: false,
                    message: 'Ownership verification not possible for this resource'
                });
            }

            if (
                resource[ownerField].toString() !== req.user.id &&
                req.user.role !== 'admin'
            ) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to modify this resource'
                });
            }

            // Attach resource to request for later use
            req.resource = resource;
            next();
        } catch (err) {
            console.error('Ownership check error:', err);
            res.status(500).json({
                success: false,
                message: 'Server error during ownership verification'
            });
        }
    };
};

// Optional authentication (useful for public routes that have optional auth)
export const optionalAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await verifyToken(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
        }
        next();
    } catch (err) {
        // Continue without authentication if token is invalid
        next();
    }
};