import React, { useState, useEffect } from 'react'
import {
    Select,
    Button,
    Dialog,
    Input,
    Notification,
    toast,
} from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

const MangeDepartmentCourses = () => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
    }

    const selectStyle = {
        display: 'flex',
        justifyContent: 'stretch',
        width: '100%',
        marginBottom: '20px',
    }

    const [colleges, setColleges] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedCollege, setSelectedCollege] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const handleCollegeChange = (selectedOption) => {
        console.log(selectedOption) // log the selected option
        setSelectedCollege(selectedOption)
        fetchDepartments(selectedOption.value)
    }

    const handleDepartmentChange = (selectedOption) => {
      console.log(selectedOption)
        setSelectedDepartment(selectedOption)
    }
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [newCourseName, setNewCourseName] = useState('')
    const [newCreditHours, setNewCreditHours] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [dialogCourseId, setDialogCourseId] = useState(null)
    const [courseName, setCourseName] = useState('')
    const [creditHours, setCreditHours] = useState(null)
    const[courseobj  , setCourseobj] = useState(null)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    const closeDialog = () => {
        setDeleteDialogOpen(false)
        setUpdateDialogOpen(false)
        setDialogCourseId(null)
        setCourseName('')
        setCreditHours(null)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        // setDialogCourseId(null)
    }

    const closeUpdateDialog = () => {
        setUpdateDialogOpen(false)
        setDialogCourseId(null)
        setCourseName('')
        setCreditHours(null)
    }
    const openDeleteDialog = (course_id) => {
      console.log(course_id);
        setDeleteDialogOpen(true)
        setDialogCourseId(course_id) // Make sure that course.id is defined
    }

    const openUpdateDialog = (course) => {
        console.log(course);
        setUpdateDialogOpen(true)
        setCourseobj(course)
    }
    const deleteCourse = async () => {
        console.log('Deleting course with ID: ', dialogCourseId) // Add this line to debug

        setLoading(true)
        try {
            const response = await fetch(`/api/courses/${dialogCourseId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setCourses(
                    courses.filter((c) => c.course_id !== dialogCourseId)
                )
                toast.success('Course deleted successfully!')
            } else {
                toast.error('Error deleting course')
            }
        } catch (error) {
            toast.error('Error deleting course')
        } finally {
            setLoading(false)
            closeDialog()
        }
    }

    const updateCourse = async () => {
      console.log(courseobj)
      console.log(newCourseName)
      console.log(newCreditHours)
    

      try {
        const response = await fetch(`/api/courses/${courseobj.course_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newCourseName,
                credit_hours: newCreditHours,
                department_id: selectedDepartment.value,
                is_active :courseobj.is_active
            }),
        })
        if (response.ok) {
            const newCourse = await response.json()
            setCourses([...courses, newCourse])
            toast.success('Course added successfully!')
        } else {
            toast.error('Error adding course')
        }
    } catch (error) {
        toast.error('Error adding course')
    } finally {
        setLoading(false)
        setAddDialogOpen(false)
    }
    }

    useEffect(() => {
        fetchColleges()
        fetchDepartments()
    }, [])

    const fetchColleges = async () => {
        try {
            const response = await fetch('/api/collages')
            if (response.ok) {
                const data = await response.json()
                const formattedData = data.map((item) => ({
                    value: item.collageId,
                    label: item.name,
                }))
                setColleges(formattedData)
            } else {
                console.error('Error fetching colleges:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching colleges:', error)
        }
    }

    const fetchDepartments = async (collegeId) => {
        try {
            const response = await fetch(`/api/departments/${collegeId}`)
            if (response.ok) {
                const data = await response.json()
                const formattedData = data.map((item) => ({
                    value: item.departmentId,
                    label: item.name,
                }))
                setDepartments(formattedData)
            } else {
                console.error(
                    'Error fetching departments:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error fetching departments:', error)
        }
    }

    const addCourse = async () => {
        setLoading(true)

        try {
            const response = await fetch(`/api/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newCourseName,
                    credit_hours: newCreditHours,
                    department_id: selectedDepartment.value,
                }),
            })
            if (response.ok) {
                const newCourse = await response.json()
                setCourses([...courses, newCourse])
                toast.success('Course added successfully!')
            } else {
                toast.error('Error adding course')
            }
        } catch (error) {
            toast.error('Error adding course')
        } finally {
            setLoading(false)
            setAddDialogOpen(false)
        }
    }

    const fetchCourses = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                `/api/courses/${selectedDepartment.value}`
            )
            if (response.ok) {
                const allCourses = await response.json()
                // const filteredCourses = allCourses.filter(
                //   course => course.department_name === selectedDepartment.label
                // );
                setCourses(allCourses)
            } else {
                console.error('Error fetching courses:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching courses:', error)
        } finally {
            setLoading(false)
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
                        onClick={() => openUpdateDialog(props.row.original)}
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
                        onClick={() => openDeleteDialog(props.row.original.course_id)} // Make sure props.data contains the course object
                        icon={<HiTrash />}
                    />
                </div>
            ),
        },
    ]

    return (
        <div>
            <div style={selectStyle}>
                <Select
                    placeholder="Please Select the college"
                    options={colleges}
                    value={selectedCollege}
                    onChange={handleCollegeChange}
                />
                <Select
                    placeholder="Please Select the department"
                    options={departments}
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                />
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="solid"
                        className="bg-blue-500 text-white"
                        onClick={fetchCourses}
                    >
                        Show Courses
                    </Button>
                    <Button
                        variant="success"
                        className="bg-green-500 text-white ml-4"
                        onClick={() => setAddDialogOpen(true)}
                    >
                        Add Course
                    </Button>
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
                <h5 className="mb-4">Update Course</h5>
                    <p>Update course below:</p>
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
                <Dialog
                    isOpen={addDialogOpen}
                    onClose={() => setAddDialogOpen(false)}
                >
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

export default MangeDepartmentCourses
