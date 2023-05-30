import React, { useState } from 'react';
import { Button, Dialog, Table, Alert } from 'components/ui';
import StudentMessagesTable from './StudentMessagesTable';

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
        المساقات المقترحة من قبل الطلبة
      </Alert>
      <Table>
        <THead>
          <Tr>
            <Th>Course</Th>
            <Th>Num of requests</Th>
            <Th>students messages</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Software Documentation</Td>
            <Td>17</Td>
            <Td
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => openDialog('View')}
            >
              View
            </Td>
          </Tr>
        </TBody>
      </Table>

      {/* Dialog */}
      {selectedStudent && (
        <Dialog isOpen={!!selectedStudent} onClose={closeDialog}>
          <StudentMessagesTable student={selectedStudent} />
        </Dialog>
      )}
    </div>
  );
};

export default ViewSuggestedCourses;