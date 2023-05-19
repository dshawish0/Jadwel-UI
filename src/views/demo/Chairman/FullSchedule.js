import React, { useState, useEffect } from 'react';
import { DataTable } from 'components/shared';
import { AdaptableCard } from 'components/shared'

const FullSchedule = () => {
  const [data, setData] = useState([
    {
      id: 1,
      courseName: 'Software Design',
      creditHours: 3,
      days: 'Monday, Wednesday',
      capacity: 30,
    },
    {
      id: 2,
      courseName: 'Security',
      creditHours: 4,
      days: 'Tuesday, Thursday',
      capacity: 25,
    },
    {
      id: 3,
      courseName: 'Software Testing',
      creditHours: 2,
      days: 'Friday',
      capacity: 20,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 20,
    query: '',
    sort: {
      order: 'desc',
      key: 'id',
    },
  });

  const columns = [
    {
      header: 'Course Name',
      accessorKey: 'courseName',//row.original.courseName
      cell: ({ row }) => {
        return (
          <div class="grid grid-cols-1 gap-2">
            <div>Course Name:	INTRODUCTION TO PARAMEDIC</div>
            <div>Credit Hours:	2</div>
         </div>
        )
      }
    },
    {
      header: 'Course Name2',
      accessorKey: 'courseName2',//row.original.courseName
      cell: ({ row }) => {
        return (
          <table class="table-auto border">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td> 
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
        )
        }
    },
    // {
    //   header: 'Credit Hours',
    //   accessorKey: 'creditHours',
    // },
    
    // {
    //   header: 'Days',
    //   accessorKey: 'days',
    // },
    // {
    //   header: 'Capacity',
    //   enableSorting: false,
    //   accessorKey: 'capacity',
    // },
  ];

  const handlePaginationChange = (pageIndex) => {
    setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }));
  };

  const handleSelectChange = (pageSize) => {
    setTableData((prevData) => ({ ...prevData, ...{ pageSize } }));
  };

  const handleSort = ({ order, key }) => {
    setTableData((prevData) => ({
      ...prevData,
      ...{ sort: { order, key } },
    }));
  };

  useEffect(() => {
    setLoading(true);
    setData(data);
    setLoading(false);
    setTableData((prevData) => ({
      ...prevData,
      ...{ total: data.length },
    }));
  }, []);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="mb-4 lg:mb-0">AI Generated Schedule</h3>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handleSelectChange}
        onSort={handleSort}
      />
    </AdaptableCard>
  );
};

export default FullSchedule;
