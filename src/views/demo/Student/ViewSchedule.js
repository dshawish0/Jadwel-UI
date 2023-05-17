import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Input, Notification, toast } from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { apiDeleteSchedule } from 'services/scheduleService'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'
import CreatableSelect from './Form/Schedule'

/** Example purpose only */
const ViewSchedule = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: 'desc',
            key: 'id',
        },
    })

    const [dialogItemId, setDialogItemId] = useState(false)
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = (props) => {
        setDialogItemId(props.row.original.id)
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        handleDelete()
        setDialogItemId(false)
        setIsOpen(false)
    }

    const inputRef = useRef()

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        if (typeof val === 'string' && (val.length > 1 || val.length === 0)) {
            setTableData((prevData) => ({
                ...prevData,
                ...{ query: val, pageIndex: 1 },
            }))
        }
    }

    const handleChange = (e) => {
        debounceFn(e.target.value)
    }

    const handleAction = (cellProps) => {
        alert('@todo Edit')
        console.log('Action clicked', cellProps)
    }
    const handleDelete = async () => {
        setLoading(true)
        const success = await apiDeleteSchedule({ id: dialogItemId })
        if (success) {
            const filteredData = data.filter((item) => item.id !== dialogItemId)
            setData(filteredData)
            popNotification('deleted')
        }
        setLoading(false)
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Schedule successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        //  navigate('/ViewSchedule')
    }

    const columns = [
        {
            header: 'name',
            accessorKey: 'name',
        },
        {
            header: 'days',
            accessorKey: 'day',
        },
        {
            header: 'college',
            enableSorting: false,
            accessorKey: 'college',
        },
        {
            header: 'departments',  
            accessorKey: 'department_name',
        },
        {
            header: 'courses',
            enableSorting: false,
            accessorKey: 'courses',
        },
        {
            header: '',
            id: 'action',
            cell: (props) => (
                <div className="flex items-center gap-4">
                    <Button
                        shape="circle"
                        size="sm"
                        variant="twoTone"
                        onClick={() => handleAction(props)}
                        icon={<HiPencilAlt />}
                    />
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

    const handlePaginationChange = (pageIndex) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }))
    }

    const handleSelectChange = (pageSize) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }))
    }

    const handleSort = ({ order, key }, aaa) => {
        console.log({ order, key })
        console.log(aaa)
        setTableData((prevData) => ({
            ...prevData,
            ...{ sort: { order, key } },
        }))
    }
    const fetchData = async () => {
        setLoading(true)
        const response = await axios.get('/api/courses' , tableData)
        console.log('response')
        console.log(response)
        if (response.data) {
            setData(response.data)
            setLoading(false)
            setTableData((prevData) => ({
                ...prevData,
                ...{ total: response.data.total },
            }))
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tableData.pageIndex,
        tableData.sort,
        tableData.pageSize,
        tableData.query,
    ])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h3 className="mb-4 lg:mb-0">Add Course</h3>
                    <CreatableSelect fetchData={fetchData} />
                </div>

                <div className="flex justify-end mb-4">
                    <Input
                        ref={inputRef}
                        placeholder="Search..."
                        size="sm"
                        className="lg:w-52"
                        onChange={handleChange}
                    />
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
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Confirm Delete Schedule</h5>
                <p>Are you sure you want to delete this schedule?</p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </AdaptableCard>
    )
}

export default ViewSchedule
