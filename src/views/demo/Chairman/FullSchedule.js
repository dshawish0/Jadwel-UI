import React, { useState, useEffect } from 'react';
import { DataTable } from 'components/shared';
import { AdaptableCard } from 'components/shared';
import { Dialog, Table } from 'components/ui';
import StudentsInfo from './StudentsInfo';

const { Td } = Table;

const FullSchedule = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const openDialog = (student) => {
    setSelectedStudent(student);
  };

  const closeDialog = () => {
    setSelectedStudent(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/courses'); // Replace with your API endpoint
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="mb-4 lg:mb-0">Statistical semester schedule</h3>
        </div>
      </div>
      <DataTable
        columns={[
          {
            header: 'Course Name',
            accessorKey: 'courseName',
            cell: ({ row }) => {
              return (
                <div className="grid grid-cols-1 gap-2">
                  <div>Course Name: {row.original.name}</div>
                  <div>Credit Hours: {row.original.credit_hours}</div>
                </div>
              );
            },
          },
          {
            accessorKey: 'Details',
            cell: () => {
              return (
                <table className="table-auto border">
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>Registers</th>
                      <th>Schedules</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.department_name}</td>
                        <td>{item.course_id}</td>
                        <Td
                          style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => openDialog('View')}
                        >
                          View
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            },
          },
        ]}
        data={data}
        loading={loading}
      />
      {/* Dialog */}
      {selectedStudent && (
        <Dialog isOpen={!!selectedStudent} onClose={closeDialog}>
          <StudentsInfo />
        </Dialog>
      )}
    </AdaptableCard>
  );
};

export default FullSchedule;
