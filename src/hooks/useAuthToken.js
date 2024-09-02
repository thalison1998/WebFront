
import { useState, useEffect } from 'react';

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('authToken');
};

const setTokenInLocalStorage = (token) => {
  localStorage.setItem('authToken', token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('authToken');
};

export const useAuthToken = () => {
  const [token, setToken] = useState(getTokenFromLocalStorage());

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

  const saveToken = (newToken) => {
    setTokenInLocalStorage(newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    removeTokenFromLocalStorage();
    setToken(null);
  };

  return { token, saveToken, removeToken };
};
