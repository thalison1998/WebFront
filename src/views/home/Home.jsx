import React from 'react';
import StudentList from '../../components/StudentList/StudentList';

const Home = () => {
  return (
    <div className="container">
      <h1 className="my-4">Student List</h1>
      <StudentList />
    </div>
  );
};

export default Home;