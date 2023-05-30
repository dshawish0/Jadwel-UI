import React from 'react';
import { Table } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table;

const StudentMessagesTable = ({ student }) => {
  // You can fetch the student's messages from an API or use the data you have

  const messages = [
     { id: 1, message: `Hi, I'm ${student}. I'm interested in taking this course. Can you provide more information about it?` },
      { id: 2, message: `Hello, I'm ${student}. I've heard great things about this course. Is it available in the upcoming semester?` },
      { id: 3, message: `Hey, ${student} here. I would like to enroll in this course. Could you let me know about the prerequisites?` },
    // Add more messages as needed
  ];

  return (
    <Table style={{ width: '100%', height: '300%' }}>
      <THead>
        <Tr>
          <Th>Student Name</Th>
          <Th>Message</Th>
        </Tr>
      </THead>
      <TBody>
        {messages.map((msg) => (
          <Tr key={msg.id}>
            <Td>{student}</Td>
            <Td>{msg.message}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default StudentMessagesTable;