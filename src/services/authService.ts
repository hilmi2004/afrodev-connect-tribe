
import { User } from "@/types/tribe";
import api from "@/lib/api.ts";


const API_URL= 'http://localhost:5000/api';
interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
  errors?: string[];
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  agreedToTerms: boolean;
  [key: string]: any;
}

export const authService = {
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        agreedToTerms: true,
        ...userData
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || []
      };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No token available' };
      }

      const response = await api.get('/users/me'); // Update this endpoint
      return {
        success: true,
        user: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user'
      };
    }
  },

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Update failed'
        };
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      return {
        success: true,
        user: data.user
      };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Network error during update'
      };
    }
  },

  async joinTribe(tribeId: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_URL}/tribes/${tribeId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join tribe');
      }
    } catch (error: any) {
      console.error('Join tribe error:', error);
      throw error;
    }
  },

  async leaveTribe(tribeId: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_URL}/tribes/${tribeId}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to leave tribe');
      }
    } catch (error: any) {
      console.error('Leave tribe error:', error);
      throw error;
    }
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  }
};