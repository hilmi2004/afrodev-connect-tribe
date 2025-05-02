
interface AuthResponse {
  success: boolean;
  user?: any;
  token?: string;
  message?: string;
}

const API_URL = 'http://localhost:5000/api';

export const authService = {
  // Register a new user
  async register(userData: any): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      }
      
      return {
        success: false,
        message: data.message || 'Registration failed',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Network error, please try again',
      };
    }
  },

  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      }
      
      return {
        success: false,
        message: data.message || 'Invalid credentials',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error, please try again',
      };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return {
          success: false,
          message: 'No authentication token',
        };
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return {
          success: true,
          user: data.user,
        };
      }
      
      // Token invalid, logout
      this.logout();
      return {
        success: false,
        message: data.message || 'Session expired',
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        message: 'Network error, please try again',
      };
    }
  },

  // Update user profile
  async updateProfile(userData: any): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return {
          success: false,
          message: 'No authentication token',
        };
      }

      const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return {
          success: true,
          user: data.user,
        };
      }
      
      return {
        success: false,
        message: data.message || 'Update failed',
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Network error, please try again',
      };
    }
  },

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  },

  // Logout user
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
};
