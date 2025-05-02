
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { RegistrationData } from '../../components/auth/registration/types';

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'afrodevconnect-secret-key';

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegistrationData = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const newUser = new User(userData);
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });
    
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

// Verify token and get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user
    });
    
  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};
