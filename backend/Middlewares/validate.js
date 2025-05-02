import { body, validationResult } from 'express-validator';

// Validation rules for registration
export const validateRegisterInput = [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('country').notEmpty().withMessage('Country is required'),
    body('experience').notEmpty().withMessage('Experience level is required'),
    body('agreedToTerms')
        .isBoolean()
        .withMessage('You must agree to the terms and conditions')
        .custom(value => value === true)
        .withMessage('You must agree to the terms and conditions'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for login
export const validateLoginInput = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];