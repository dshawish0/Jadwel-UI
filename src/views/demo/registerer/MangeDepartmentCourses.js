import React, { useState, useEffect } from 'react';
import { Select, Button, Dialog, Input, Notification, toast } from 'components/ui';
import { AdaptableCard, DataTable } from 'components/shared';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const MangeDepartmentCourses = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px'
  }

  const selectStyle = {
    display: 'flex',
    justifyContent: 'stretch',
    width: '100%',
    marginBottom: '20px'
  }

  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleCollegeChange = (selectedOption) => {
    setSelectedCollege(selectedOption);
  }
  
  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
  }
  const [addDialogOpen, setAddDialogOpen] = useState(false);
const [newCourseName, setNewCourseName] = useState("");
const [newCreditHours, setNewCreditHours] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [dialogCourseId, setDialogCourseId] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
 

  const closeDialog = () => {
    setDeleteDialogOpen(false);
    setUpdateDialogOpen(false);
    setDialogCourseId(null);
    setCourseName("");
    setCreditHours(null);
}

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDialogCourseId(null);
  }
  
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setDialogCourseId(null);
    setCourseName("");
    setCreditHours(null);
  }
  const openDeleteDialog = (course) => {
    setDeleteDialogOpen(true);
    setDialogCourseId(course.id);
  }
  
  const openUpdateDialog = (course) => {
    setUpdateDialogOpen(true);
    setDialogCourseId(course.id);
    setCourseName(course.name);
    setCreditHours(course.credit_hours);
  }
  const deleteCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses/${dialogCourseId}`, { method: 'DELETE' });
      if (response.ok) {
        setCourses(courses.filter(c => c.id !== dialogCourseId));
        toast.success('Course deleted successfully!');
      } else {
        toast.error('Error deleting course');
      }
    } catch (error) {
      toast.error('Error deleting course');
    } finally {
      setLoading(false);
      closeDialog();
    }
  }

  const updateCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses/${dialogCourseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: courseName, credit_hours: creditHours })
      });
      if (response.ok) {
        const updatedCourse = await response.json();
        setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
        toast.success('Course updated successfully!');
      } else {
        toast.error('Error updating course');
      }
    } catch (error) {
      toast.error('Error updating course');
    } finally {
      setLoading(false);
      closeDialog();
    }
  }

  useEffect(() => {
    fetchColleges();
    fetchDepartments();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await fetch('/api/collages');
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(item => ({ value: item.id, label: item.name }));
        setColleges(formattedData);
      } else {
        console.error('Error fetching colleges:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  }
  
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(item => ({ value: item.id, label: item.name }));
        setDepartments(formattedData);
      } else {
        console.error('Error fetching departments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }
  const addCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCourseName, credit_hours: newCreditHours })
      });
      if (response.ok) {
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
        toast.success('Course added successfully!');
      } else {
        toast.error('Error adding course');
      }
    } catch (error) {
      toast.error('Error adding course');
    } finally {
      setLoading(false);
      setAddDialogOpen(false);
    }
  }

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const allCourses = await response.json();
        const filteredCourses = allCourses.filter(
          course => course.department_name === selectedDepartment.label
        );
        setCourses(filteredCourses);
      } else {
        console.error('Error fetching courses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }
  
  

  const columns = [
    {
      header: 'Course Name',
      accessorKey: 'name',
    },
    {
      header: 'Credit Hours',
      accessorKey: 'credit_hours',
    },
    {
      header: 'Department Name',
      accessorKey: 'department_name',
    },
    {
      header: 'Edit',
      id: 'edit',
      cell: (props) => (
        <div className="flex items-center gap-4">
          <Button
            shape="circle"
            size="sm"
            variant="twoTone"
            onClick={() => openUpdateDialog(props.data)}
            icon={<HiPencilAlt />}
/>

        </div>
      ),
    },
    {
      header: 'Delete',
      id: 'delete',
      cell: (props) => (
        <div className="flex items-center gap-4">
                  <Button
          shape="circle"
          size="sm"
          variant="twoTone"
          onClick={() => openDeleteDialog(props.data)}
          icon={<HiTrash />}
        />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={selectStyle}>
        {/* <Select
          placeholder="Please Select the college"
          options={colleges}
          value={selectedCollege}
          onChange={handleCollegeChange}
        /> */}
        <Select
          placeholder="Please Select the department"
          options={departments}
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        />
        <div className="flex justify-end space-x-4">
  <Button variant="solid" className="bg-blue-500 text-white" onClick={fetchCourses}>Show Courses</Button>
  <Button variant="success" className="bg-green-500 text-white ml-4" onClick={() => setAddDialogOpen(true)}>Add Course</Button>
</div>

      </div>

      <AdaptableCard className="h-full" bodyClass="h-full">
        <DataTable columns={columns} data={courses} loading={loading} />

        <Dialog isOpen={deleteDialogOpen} onClose={closeDeleteDialog}>
          <h5 className="mb-4">Confirm Delete Course</h5>
          <p>Are you sure you want to delete this course?</p>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={deleteCourse}
              loading={loading}
            >
              Delete
            </Button>
          </div>
        </Dialog>

        <Dialog isOpen={updateDialogOpen} onClose={closeUpdateDialog}>
          <h5 className="mb-4">Edit Course</h5>
          <p>Update course information below:</p>
          <Input
  label="Course Name"
  value={courseName}
  placeholder="Enter course name"
  onChange={(e) => setCourseName(e.target.value)}
/>
<Input
  label="Credit Hours"
  type="number"
  value={creditHours}
  placeholder="Enter credit hours"
  onChange={(e) => setCreditHours(e.target.value)}
/>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={updateCourse}
              loading={loading}
            >
              Update
            </Button>
          </div>
        </Dialog>
        <Dialog isOpen={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
  <h5 className="mb-4">Add Course</h5>
  <p>Add a new course below:</p>
  <Input
    label="Course Name"
    value={newCourseName}
    placeholder="Enter new course name"
    onChange={(e) => setNewCourseName(e.target.value)}
  />
  <Input
    label="Credit Hours"
    type="number"
    value={newCreditHours}
    placeholder="Enter new credit hours"
    onChange={(e) => setNewCreditHours(e.target.value)}
  />
  <div className="text-right mt-6">
    <Button
      className="ltr:mr-2 rtl:ml-2"
      variant="plain"
      onClick={() => setAddDialogOpen(false)}
    >
      Cancel
    </Button>
    <Button
      variant="solid"
      onClick={addCourse}
      loading={loading}
    >
      Add
    </Button>
  </div>
</Dialog>

      </AdaptableCard>
    </div>
  )
}

export default MangeDepartmentCourses;
