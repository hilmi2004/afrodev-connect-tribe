
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'afrodevconnect-secret-key';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Add user ID to request
    req.userId = decoded.id;
    
    next();
  } catch (error: any) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};
