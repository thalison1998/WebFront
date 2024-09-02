import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../../components/StudentForm/StudentForm';
import './Student.css';

const Student = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/home');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <Button variant="secondary" onClick={handleHomeRedirect} className="float-end">
            Go to Home
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={10}>
          <StudentForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Student;
