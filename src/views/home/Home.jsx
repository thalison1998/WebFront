import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StudentList from '../../components/StudentList/StudentList';
import './Home.css';
import { useAuthToken } from '../../hooks/useAuthToken';

const Home = () => {
  const navigate = useNavigate();
  const { removeToken } = useAuthToken();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <div className="container position-relative">
      <Button
        variant="secondary"
        onClick={handleLogout}
        className="position-absolute top-0 end-0 mt-3 me-3"
      >
        Log Out
      </Button>
      <h1 className="ml-30">Student List</h1>
      <StudentList />
    </div>
  );
};

export default Home;