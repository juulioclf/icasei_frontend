import axios from 'axios';

const AUTH_URL = `http://localhost:3000/api/auth`;
const TOKEN_KEY = 'jwt_token';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, { username, password });
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem('userId', response.data.user.userId.toString()); // Armazena o userId no localStorage
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('userId'); // Remove também o userId ao fazer logout
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};
