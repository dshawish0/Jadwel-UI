import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    Input,
    Notification,
    toast,
    Select,
} from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import axios from 'axios'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

const ManageDepartment = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialogItemId, setDialogItemId] = useState(null)
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
    const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)
    const [editedDepartmentName, setEditedDepartmentName] = useState('')
    const [editedCollege, setEditedCollege] = useState(null)
    const [newDepartmentName, setNewDepartmentName] = useState('')
    const [newCollege, setNewCollege] = useState(null)
    const [collegeOptions, setCollegeOptions] = useState([])

    const openDialog = (props) => {
        setDialogItemId(props.row.original.departmentId) // Make sure this line points to the correct id
        setDialogIsOpen(true)
    }

    const openEditDialog = (props) => {
        setDialogItemId(props.row.original.departmentId);
        setEditedDepartmentName(props.row.original.name);
        setEditedCollege({ label: props.row.original.collageName, value: props.row.original.collageId }); // Here is the change
        setEditDialogIsOpen(true);
    };
    
    const closeDialogs = () => {
        setDialogIsOpen(false)
        setEditDialogIsOpen(false)
        setAddDialogIsOpen(false)
    }

    const deleteDepartment = async () => {
        setLoading(true)

        try {
            const response = await fetch(`/api/departments/${dialogItemId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                const filteredData = data.filter(
                    (item) => item.collage_id !== dialogItemId
                )
                setData(filteredData)
            } else {
                console.error('Error deleting department:', response.statusText)
            }
            setDialogIsOpen(false)
            window.location.reload()
        } catch (error) {
            console.error('Error deleting department:', error)
        } finally {
            setLoading(false)
            closeDialogs()
        }
    }
    const updateDepartment = async () => {
        setLoading(true)
        console.log(editedDepartmentName);
        console.log(sessionStorage.getItem('UpdateCollageId')); //Make sure this logs the correct college ID
       

        try {
            const response = await axios.put(
                `/api/departments/${dialogItemId}`,
                {
                    name: editedDepartmentName,
                    collage_id:  sessionStorage.getItem('UpdateCollageId'),
                }
            )
            if (response.status === 200) {
                const updatedData = data.map((item) => {
                    if (item.departmentId === dialogItemId) {
                        return {
                            ...item,
                            name: editedDepartmentName,
                            collage_id: editedCollege?.value,
                            collageName: editedCollege?.label,
                        }
                    }
                    return item
                })

                setData(updatedData)
                closeDialogs()
            } else {
                console.error('Error updating department:', response.data)
            }
        } catch (error) {
            console.error('Error updating department:', error)
        } finally {
            setLoading(false)
        }
    }

   const addDepartment = async () => {
    setLoading(true)
    try {
        const response = await axios.post('/api/departments', {
            name: newDepartmentName,
            collage_id: sessionStorage.getItem('UpdateCollageId'),
        })

        if (response.status === 201) {
            const newDepartment = response.data
            const updatedData = [...data, newDepartment]

            setData(updatedData)
            // Close dialog here
            closeDialogs()

            // Reload the page
            window.location.reload();
        } else {
            console.error('Error adding department:', response.data)
        }
       
    } catch (error) {
        console.error('Error adding department:', error)
    } finally {
        setLoading(false)
    }
}

    

    const columns = [
        {
            header: 'College Name',
            accessorKey: 'collageName',
        },
        {
            header: 'Department Name',
            accessorKey: 'name',
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
                        onClick={() => openEditDialog(props)}
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
                        onClick={() => openDialog(props)}
                        icon={<HiTrash />}
                    />
                </div>
            ),
        },
    ]

    const fetchDepartments = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/departments')
            console.log(response.data) // Add this line to check your data structure
            setData(response.data)
        } catch (error) {
            console.error('Error fetching departments:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchColleges = async () => {
        try {
            const response = await axios.get('/api/collages')
            const colleges = response.data.map((college) => ({
                label: college.name,
                value: college.collageId,
            }))
            setCollegeOptions(colleges)
        } catch (error) {
            console.error('Error fetching colleges:', error)
        }
    }
    

    useEffect(() => {
        fetchColleges();
        fetchDepartments();
    
        // Check session storage and update the states if necessary
        const collegeId = sessionStorage.getItem('UpdateCollageId');
        if (collegeId) {
            const collegeOption = collegeOptions.find(college => college.value === collegeId);
            setNewCollege(collegeOption);
            setEditedCollege(collegeOption);
        }
    }, []);

    return (
        <>
            <div className=" mb-10">
                <Button
                    variant="solid"
                    onClick={() => setAddDialogIsOpen(true)}
                >
                    Add Department
                </Button>
            </div>

            <AdaptableCard className="h-full" bodyClass="h-full">
                <DataTable columns={columns} data={data} loading={loading} />

                <Dialog isOpen={dialogIsOpen} onClose={closeDialogs}>
                    <h5 className="mb-4">Confirm Delete Department</h5>
                    <p>Are you sure you want to delete this department?</p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={closeDialogs}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={deleteDepartment}
                            loading={loading}
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog>

                <Dialog isOpen={editDialogIsOpen} onClose={closeDialogs}>
                    <h5 className="mb-4">Edit Department</h5>
                    <p>Update department information below:</p>
                    <Input
                        label="Department Name"
                        value={editedDepartmentName}
                        onChange={(e) =>
                            setEditedDepartmentName(e.target.value)
                        }
                    />
                    <Select
                        options={collegeOptions}
                        value={editedCollege}
                        onChange={(val) => {
                            console.log("collage_id" + " " + val.value)
                            sessionStorage.setItem('UpdateCollageId', val.value);
                            setEditedCollege(val.value) // You may need to update this line
                        }}
                    />
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={closeDialogs}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={updateDepartment}
                            loading={loading}
                        >
                            Update
                        </Button>
                    </div>
                </Dialog>

                <Dialog isOpen={addDialogIsOpen} onClose={closeDialogs}>
                    <h5 className="mb-4">Add New Department</h5>
                    <p>Add new department information below:</p>
                    <Input
                    placeholder="Enter Department Name"
                        label="Department Name"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                    />
                    <Select
                        options={collegeOptions}
                        value={newCollege}
                        onChange={(val) => {
                            console.log("collage_id" + " " + val.value)
                            sessionStorage.setItem('UpdateCollageId', val.value);
                            setNewCollege(val) // updated

                        }}
                    />

                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={closeDialogs}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={addDepartment}
                            loading={loading}
                        >
                            Add
                        </Button>
                    </div>
                </Dialog>
            </AdaptableCard>
        </>
    )
}

export default ManageDepartment
