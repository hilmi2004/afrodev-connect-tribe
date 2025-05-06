// src/hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authService } from '../services/authService';
import {  Tribe } from '@/types/tribe.ts';

// User Experience Type
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

// User Education Type
interface Education {
  degree: string;
  institution: string;
  year: string;
}

// Social Links Type
interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

// Complete User Type
interface User {
  _id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  country?: string;
  bio?: string;
  role?: 'user' | 'moderator' | 'admin';
  experience?: Experience[];
  education?: Education[];
  programmingLanguages?: string[];
  languages?: string[];
  startYear?: string;
  learningStyle?: string;
  interests?: string[];
  careerGoals?: string;
  communicationPreference?: string;
  githubUsername?: string;
  referralSource?: string;
  platformGoals?: string[];
  preferredCommunication?: string;
  timeZone?: string;
  workStyle?: string;
  meetupInterest?: boolean;
  mentorInterest?: string;
  expectationsFromPlatform?: string;
  agreedToTerms?: boolean;
  socialLinks?: SocialLinks;
  joinedTribes?: string[];
  createdTribes?: string[];
  savedRoadmaps?: string[];
  followers?: string[];
  following?: string[];
}

// Registration Data Type
interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  agreedToTerms: boolean;
}

// Authentication Response Type
interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
  errors?: string[];
}

// Auth Context Type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (newUserData: Partial<User>) => Promise<void>;
  refreshAuth: () => Promise<void>;
  joinTribe: (tribeId: string) => Promise<void>;
  leaveTribe: (tribeId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeAuth = useCallback(async () => {
    setLoading(true);
    try {
      if (authService.isLoggedIn()) {
        const response = await authService.getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        } else {
          await authService.logout();
          resetAuthState();
        }
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError('Failed to initialize authentication');
      resetAuthState();
    } finally {
      setLoading(false);
    }
  }, []);

  const resetAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const refreshAuth = async () => {
    await initializeAuth();
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        return {
          success: true,
          user: response.user,
          token: response.token
        };
      }
      const errorMessage = response.error || response.message || 'Login failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'An unexpected error occurred during login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        return {
          success: true,
          user: response.user,
          token: response.token
        };
      }
      const errorMessage = response.errors || response.message || 'Registration failed';

      setError(typeof errorMessage === 'string' ? errorMessage : errorMessage[0]);
      return {
        success: false
      };
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err.message || 'An unexpected error occurred during registration';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (newUserData: Partial<User>) => {
    if (!user) return;
    try {
      setLoading(true);
      // Add type assertion for the update payload
      const response = await authService.updateProfile(newUserData as any);
      if (response.success && response.user) {
        setUser(response.user);
      }
    } catch (err) {
      console.error('Failed to update user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const joinTribe = async (tribeId: string) => {
    if (!user) throw new Error('User not authenticated');
    try {
      setLoading(true);
      // Add proper typing for the tribe service call
      await authService.joinTribe(tribeId as any);
      const updatedUser = {
        ...user,
        joinedTribes: [...(user.joinedTribes || []), tribeId]
      };
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to join tribe:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const leaveTribe = async (tribeId: string) => {
    if (!user) throw new Error('User not authenticated');
    try {
      setLoading(true);
      // Add proper typing for the tribe service call
      await authService.leaveTribe(tribeId as any);
      const updatedUser = {
        ...user,
        joinedTribes: (user.joinedTribes || []).filter(id => id !== tribeId)
      };
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to leave tribe:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    resetAuthState();
  };

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    token: authService.getToken(), // Add this line
    login,
    register,
    logout,
    isAuthenticated,
    updateUser,
    refreshAuth,
    joinTribe,
    leaveTribe
  };

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};