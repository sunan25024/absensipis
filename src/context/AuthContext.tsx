import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email === 'admin@para.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@para.com',
        role: 'admin',
        permissions: [],
        isOnline: true
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    } else if (email === 'john.doe@para.com' && password === 'employee123') {
      const employeeUser: User = {
        id: '3',
        name: 'John Doe',
        email: 'john.doe@para.com',
        role: 'employee',
        employeeId: 'EMP001',
        permissions: [],
        isOnline: true
      };
      setUser(employeeUser);
      localStorage.setItem('user', JSON.stringify(employeeUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};