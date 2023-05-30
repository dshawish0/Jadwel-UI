import React, { useEffect, useState } from 'react';
import { Table } from 'components/ui';
import { useNavigate } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody } = Table;

const StudentsInfo = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch students data
    const fetchStudents = async () => {
      try {
        // Fake API response
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);
  const navigate = useNavigate();

  const navigateToAnotherPage = () => {
    navigate('/compare-schedule');
  };
  return (
    <Table style={{ width: '100%', height: '300%' }}>
      <THead>
        <Tr>
          <Th>Student Name</Th>
          <Th>schedules</Th>
        </Tr>
      </THead>
      <TBody>
        {students.map((student) => (
          <Tr key={student.id}>
            <Td>{student.name}</Td>
            <Td> <button onClick={navigateToAnotherPage}>View</button></Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default StudentsInfo;
