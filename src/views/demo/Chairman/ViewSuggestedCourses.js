import React, { useState } from 'react';
import { Button, Dialog, Table , Alert } from 'components/ui';
import Message from './Message'; // Import the Message component

const { Tr, Th, Td, THead, TBody } = Table;

const ViewSuggestedCourses = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openDialog = (student) => {
    setSelectedStudent(student);
  };

  const closeDialog = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      {/* Table */}
      <Alert className="mb-4" type="info" showIcon>
           المساقات المقترحه من قبل الطلبة    </Alert>
      <Table>
        <THead>
          <Tr>
            <Th>Course</Th>
            <Th>Student message</Th>
            <Th>Num of requests</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Software Documentation</Td>
            <Td
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => openDialog('View')}
            >
              View
            </Td>
            <Td>17</Td>
          </Tr>
          <Tr>
            <Td>Software Design</Td>
            <Td
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => openDialog('View')}
            >
             View
            </Td>
            <Td>26</Td>
          </Tr>
          <Tr>
            <Td>Android</Td>
            <Td
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => openDialog('View')}
            >
              View
            </Td>
            <Td>20</Td>
          </Tr>
        </TBody>
      </Table>

      {/* Dialog */}
      {selectedStudent && (
        <Dialog isOpen={!!selectedStudent} onClose={closeDialog}>
          <Message student={selectedStudent} onClose={closeDialog} />
        </Dialog>
      )}
    </div>
  );
};

export default ViewSuggestedCourses;
