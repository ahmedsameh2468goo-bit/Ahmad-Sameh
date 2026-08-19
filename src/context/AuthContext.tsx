import React, { createContext, useContext, useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'ASM_2008goo';
const AUTH_STORAGE_KEY = 'ahmed_sameh_admin_auth_v1';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [isAuthenticated]);

  const login = (password: string): { success: boolean; error?: string } => {
    if (!password || password.trim() === '') {
      return { success: false, error: 'الرجاء إدخال كلمة المرور' };
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: 'كلمة المرور غير صحيحة' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
