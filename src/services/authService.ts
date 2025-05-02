
import { RegistrationData } from '../components/auth/registration/types';

const API_URL = 'http://localhost:5000/api';

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
  error?: string;
}

export const authService = {
  // Register new user
  register: async (userData: RegistrationData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration',
      };
    }
  },
  
  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  },
  
  // Get current user
  getCurrentUser: async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return {
        success: false,
        message: 'No user logged in',
      };
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        message: 'Failed to fetch user data',
      };
    }
  },
  
  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },
  
  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  
  // Get logged in user
  getUser: (): any | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
