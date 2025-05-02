
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  register: async (userData: any) => {
    try {
      const response = await apiClient.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return {
        success: true,
        user: response.data.user
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  // Login user
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return {
        success: true,
        user: response.data.user
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/me');
      return {
        success: true,
        user: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get user data'
      };
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  }
};
