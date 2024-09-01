import axios from 'axios';

const API_URL = 'https://localhost:7297/api/Auth/login';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
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
