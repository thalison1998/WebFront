import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Pagination, Toast, ToastContainer } from 'react-bootstrap';
import { fetchStudents, deleteStudent } from '../../services/studentService/studentService'; // Ajuste o caminho conforme necessário
import './StudentList.css';
import { useAuthToken } from '../../hooks/useAuthToken';
import { useNavigate } from 'react-router-dom';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();
  const { removeToken } = useAuthToken();

  useEffect(() => {
    
    const loadStudents = async () => {
        
      try {
        const data = await fetchStudents();
        setStudents(data.students);
      } catch (error) {
        console.log(error)

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit student with id: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteStudent(id);

      if (result.success) {
        setToastMessage(result.message);
        setToastType('success');
        setShowToast(true);
        const data = await fetchStudents();
        setStudents(data.students);
      } else {
        setToastMessage(result.message);
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage('An unexpected error occurred');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleAdd = () => {
    console.log('Add new student');
  };

  const totalItems = students.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Student List</h2>
        <Button variant="primary" onClick={handleAdd}>Add Student</Button>
      </div>

      <div className="table-wrapper">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Average Grade</th>
              <th>Address</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Birth Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>{student.averageGrade}</td>
                <td>{student.address}</td>
                <td>{student.fatherName}</td>
                <td>{student.motherName}</td>
                <td>{student.birthDate}</td>
                <td>
                  <Button variant="warning" className="mr-2" onClick={() => handleEdit(student.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="pagination-wrapper">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>

      {/* Toast para notificação */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          autohide 
          delay={2000}
          className={toastType === 'success' ? 'toast-success' : 'toast-error'}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default StudentTable;