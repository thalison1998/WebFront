import api from '../api/api';

export const fetchStudents = async () => {
  try {
    const response = await api.get('Student');
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
    const response = await api.delete(`Student/${id}`);
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

export const addStudent = async (studentData) => {
  try {
    const response = await api.post('Student', studentData);
    if (response.status === 200) {
      return { success: true, message: 'Student added successfully.' };
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw new Error(`Validation Error: ${error.response.data.detail}`);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized - Please login again.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateStudent = async (studentData) => {
 
  try {
    const response = await api.put('Student',studentData);
    if (response.status === 200) {
      return { success: true, message: 'Student updated successfully.' };
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 500) {
      throw new Error(`Validation Error: ${error.response.data.detail}`);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized - Please login again.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`Student/${id}`);
    const student = response.data;
    return student;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Error: ${error.response.data.detail}`);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized - Please login again.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};