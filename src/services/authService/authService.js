import api from '../api/api';

export const login = async (username, password) => {
  try {
    const response = await api.post('Auth/login', {
      username,
      password,
    });
    
    const { token } = response.data;
    return token;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data.detail}`);
    }else{
      throw new Error("Error communicating with the server.");
    }
  }
};
