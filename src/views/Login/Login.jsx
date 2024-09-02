import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import LoginForm from '../../components/loginForm/LoginForm.jsx';

const Login = () => {
  return (
    <div className="login-container">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={6} className="login-cover d-none d-md-flex">
            <div className="cover-content">
            </div>
          </Col>

          <Col md={6} className="d-flex justify-content-center align-items-center">
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;