import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Input, Notification, toast } from 'components/ui'
import { AdaptableCard, DataTable } from 'components/shared'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { apiDeleteSchedule } from 'services/scheduleService'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

/** Example purpose only */
const CompareSchedule = () => {
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
            header: 'Course name',
            accessorKey: 'name',
        },
        // {
        //     header: 'days',
        //     accessorKey: 'day',
        // },
        // {
        //     header: 'college',
        //     enableSorting: false,
        //     accessorKey: 'college',
        // },
        {
            header: 'departments',  
            accessorKey: 'department_name',
        },
        // {
        //     header: 'courses',
        //     enableSorting: false,
        //     accessorKey: 'courses',
        // },
    
    ]

    const handlePaginationChange = (pageIndex) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }))
    }

    const handleSelectChange = (pageSize) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }))
    }

    const handleSort = ({ order, key }, aaa) => {
        setTableData((prevData) => ({
            ...prevData,
            ...{ sort: { order, key } },
        }))
    }
    const fetchData = async () => {
        setLoading(true)
        const response = await axios.get('/api/courses' , tableData)
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
                <h1>Student Schedule</h1>

              
            </div>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
               
            />
         
        </AdaptableCard>
    )
}

export default CompareSchedule
