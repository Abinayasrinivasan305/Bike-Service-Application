import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setUser({ token, isAdmin: token.includes('admin') }); // Example check
    }
  }, []);

  const login = async (email, password) => {
    try {
        const result = await axios.post('http://localhost:8000/login', { email, password });
        if (result.data.success) {
            const token = result.data.token;
            localStorage.setItem('auth-token', token);
            setUser({ token, isAdmin: email === 'john24@gmail.com' }); // Store additional user info
            console.log('User logged in:', { token, isAdmin: email === 'john24@gmail.com' }); // Debug statement
            return true;
        } else {
            console.error(result.data.errors || 'Login failed');
            return false;
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        return false;
    }
};


  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
