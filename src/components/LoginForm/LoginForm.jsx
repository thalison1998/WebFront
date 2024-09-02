import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../../assets/react.svg';
import { useAuthToken } from '../../hooks/useAuthToken';
import { login } from '../../services/authService/authService';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { saveToken } = useAuthToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const ValidationForms = (username, password) =>{
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;

    const resultValidation = ValidationForms(username, password);

    if(resultValidation){
      setLoading(true);
      setError('');
  
      try {
        const token = await login(username, password);
        saveToken(token);
        navigate('/home');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-form">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        {error && <div className="error-message">{error}</div>}
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;