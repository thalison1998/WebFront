import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, getStudentById, updateStudent } from '../../services/studentService/studentService'; // Ajuste o caminho conforme necessário
import './StudentForm.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    averageGrade: '',
    address: '',
    fatherName: '',
    motherName: '',
    birthDate: '',
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const data = await getStudentById(id);
          data.birthDate = formatDate(data.birthDate);
          setFormData(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchStudent();
    }
  }, [id]);

  useEffect(() => {
    const checkFormValidity = () => {
      const isValid = Object.values(formData).every(value => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        }
        return value !== '';
      });
      setIsFormValid(isValid);
    };

    checkFormValidity();
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setToastMessage('');
    setToastType('success');
    setShowToast(false);

    try {
      if (id) {
        await updateStudent(formData);
        setToastMessage('Student updated successfully');
      } else {
        await addStudent(formData);
        setToastMessage('Student added successfully');
      }

      setTimeout(() => navigate('/home'), 2000);
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Error: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container">
            <h2 className="text-center mb-4">{id ? 'Edit Student' : 'Add New Student'}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label className="form-label">Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formGrade">
                <Form.Label className="form-label">Grade</Form.Label>
                <Form.Control
                  type="number"
                  name="grade"
                  placeholder="Enter grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formAverageGrade">
                <Form.Label className="form-label">Average Grade</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="averageGrade"
                  placeholder="Enter average grade"
                  value={formData.averageGrade}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formFatherName">
                <Form.Label className="form-label">Father's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  placeholder="Enter father's name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formMotherName">
                <Form.Label className="form-label">Mother's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="motherName"
                  placeholder="Enter mother's name"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="formBirthDate">
                <Form.Label className="form-label">Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </Form.Group>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-80 mt-3"
                >
                  {loading ? (id ? 'Updating...' : 'Adding...') : (id ? 'Update Student' : 'Add Student')}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide
          delay={4000}
          bg={toastType === 'success' ? 'success' : 'danger'}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default StudentForm;