import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './LoginForm.css';
import logo from '../../assets/react.svg';

const LoginForm = () => {
  return (
    <div className="login-form">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
