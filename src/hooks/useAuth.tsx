
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from local storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isLoggedIn()) {
          const response = await authService.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid, logout
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Failed to load user', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
