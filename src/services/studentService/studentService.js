import api from '../api/api';

export const fetchStudents = async () => {
  try {
    const response = await api.get('/');
    const students = response.data;
    return students;
  } catch (error) {
    if (error.response && error.response.status !== 401) {
      throw new Error(`Error: ${error.response.data.detail}`);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized - Please login again.');
    } else {
      throw new Error("Error communicating with the server.");
    }
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    if (response.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { success: false, message: error.response.data.detail };
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized - Please login again.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
