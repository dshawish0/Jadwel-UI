import React, { useState, useEffect } from 'react'
import { Button, Dialog, Input, Notification, toast } from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import axios from 'axios'
import { apiDeleteSchedule } from 'services/scheduleService'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

const ManageColleges = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialogItemId, setDialogItemId] = useState(null)
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
    const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)
    const [editedCollegeName, setEditedCollegeName] = useState('')
    const [editedCollegeId, setEditedCollegeId] = useState('')
    const [newCollegeName, setNewCollegeName] = useState('')
    const [newCollegeId, setNewCollegeId] = useState('')

    const openDialog = (props) => {
        setDialogItemId(props.row.original.id)
        setDialogIsOpen(true)
    }

    const openEditDialog = (props) => {
        setDialogItemId(props.row.original.id)
        setEditedCollegeName(props.row.original.name)
        setEditedCollegeId(props.row.original.collageId)
        setEditDialogIsOpen(true)
    }

    const closeDialogs = () => {
        setDialogIsOpen(false)
        setEditDialogIsOpen(false)
        setAddDialogIsOpen(false)
    }

    const deleteSchedule = async () => {
        setLoading(true)
        const success = await apiDeleteSchedule({ id: dialogItemId })
        if (success) {
            const filteredData = data.filter((item) => item.id !== dialogItemId)
            setData(filteredData)
            popNotification('Deleted')
        }
        setLoading(false)
        closeDialogs()
    }

    const updateCollege = async () => {
        setLoading(true)

        try {
            const response = await axios.put(`/api/collages/${dialogItemId}`, {
                name: editedCollegeName,
                collageId: editedCollegeId,
            })

            if (response.status === 200) {
                const updatedData = data.map((item) => {
                    if (item.id === dialogItemId) {
                        return {
                            ...item,
                            name: editedCollegeName,
                            collageId: editedCollegeId,
                        }
                    }
                    return item
                })

                setData(updatedData)
                popNotification('Updated')
                closeDialogs()
            } else {
                console.error('Error updating college:', response.data)
                popNotification('Failed to update')
            }
        } catch (error) {
            console.error('Error updating college:', error)
            popNotification('Failed to update')
        } finally {
            setLoading(false)
        }
    }

    const addCollege = async () => {
        setLoading(true)

        try {
            const response = await axios.post('/api/collages', {
                name: newCollegeName,
                collegeId: newCollegeId,
            })

            if (response.status === 201) {
                const newCollege = response.data
                const updatedData = [...data, newCollege]

                setData(updatedData)
                popNotification('Added')
                closeDialogs()
            } else {
                console.error('Error adding college:', response.data)
                popNotification('Failed to add')
            }
        } catch (error) {
            console.error('Error adding college:', error)
            popNotification('Failed to add')
        } finally {
            setLoading(false)
        }
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Successfully ${keyword}`}
                type="success"
                duration={2500}
            >
                College successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    const columns = [
        {
            header: 'College Name',
            accessorKey: 'name',
        },
        {
            header: 'College ID',
            accessorKey: 'collageId',
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

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/collages')
            setData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
      <>
        <div className=" mb-10">
                <Button
                    variant="solid"
                    onClick={() => setAddDialogIsOpen(true)}
                >
                    Add College
                </Button>
            </div>


        <AdaptableCard className="h-full" bodyClass="h-full">
          
            <DataTable columns={columns} data={data} loading={loading} />

            <Dialog isOpen={dialogIsOpen} onClose={closeDialogs}>
                <h5 className="mb-4">Confirm Delete College</h5>
                <p>Are you sure you want to delete this college?</p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={closeDialogs}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={deleteSchedule}>
                        Confirm
                    </Button>
                </div>
            </Dialog>

            <Dialog isOpen={editDialogIsOpen} onClose={closeDialogs}>
                <h5 className="mb-4">Edit College</h5>
                <Input
                    label="College Name"
                    value={editedCollegeName}
                    onChange={(e) => setEditedCollegeName(e.target.value)}
                />
                <Input
                    label="College ID"
                    value={editedCollegeId}
                    onChange={(e) => setEditedCollegeId(e.target.value)}
                />
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={closeDialogs}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={updateCollege}>
                        Save
                    </Button>
                </div>
            </Dialog>

            <Dialog isOpen={addDialogIsOpen} onClose={closeDialogs}>
                <h5 className="mb-4">Add New College</h5>
                <Input
                    label="College Name"
                    value={newCollegeName}
                    onChange={(e) => setNewCollegeName(e.target.value)}
                />
               
              
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={closeDialogs}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={addCollege}>
                        Save
                    </Button>
                </div>
            </Dialog>
        </AdaptableCard>
        </>
    )
}

export default ManageColleges
