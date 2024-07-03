// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axiosInstance';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyCurrentUser();
  }, []);

 
  const verifyCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCurrentUser(response.data.userType); // Assuming response.data.userType is 'admin' or 'user'
      setLoggedIn(true);
    } catch (error) {
      console.error('Error verifying token:', error);
      setCurrentUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loggedIn,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
