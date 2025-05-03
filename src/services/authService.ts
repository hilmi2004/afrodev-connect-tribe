const API_URL = 'http://localhost:5000/api';

export const authService = {
  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<{success: boolean, user?: object, token?: string, message?: string, errors?: array}>}
   */
  async register(userData) {
    try {
      // Ensure required fields are present
      const payload = {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        country: userData.country,
        experience: userData.experience,
        agreedToTerms: true, // Must be true
        ...userData // Include any additional fields
      };

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Registration failed',
          errors: data.errors || []
        };
      }

      // Save user data and token if registration successful
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Network error during registration'
      };
    }
  },

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, user?: object, token?: string, message?: string}>}
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }

      // Save user data and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error during login'
      };
    }
  },

  /**
   * Get current authenticated user
   * @returns {Promise<{success: boolean, user?: object, message?: string}>}
   */
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        this.logout();
        return {
          success: false,
          message: data.message || 'Session expired'
        };
      }

      // Update stored user data
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        user: data.user
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        message: 'Network error fetching user data'
      };
    }
  },

  /**
   * Update user profile
   * @param {object} userData - Updated user data
   * @returns {Promise<{success: boolean, user?: object, message?: string}>}
   */
  async updateProfile(userData) {
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

      // Update stored user data
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        user: data.user
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Network error during update'
      };
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get authentication token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  }
};
