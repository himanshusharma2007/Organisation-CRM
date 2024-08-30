import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        console.log('userData :>> ', userData);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
  };
  const saveDev = (DevData) => {
    setSelectedDev(DevData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, logout, loading, saveDev }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);