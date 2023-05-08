import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from 'components/ui'
import { DataTable } from 'components/shared'
import debounce from 'lodash/debounce'
import axios from 'axios'

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
            order: '',
            key: '',
        },
    })

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
        console.log('Action clicked', cellProps)
    }

    const columns = [
        {
            header: 'days',
            accessorKey: 'days',
        },
        {
            header: 'college',
            accessorKey: 'college',
        },
        {
            header: 'departments',
            accessorKey: 'departments',
        },
        {
            header: 'courses',
            accessorKey: 'courses',
        },
        {
            header: '',
            id: 'action',
            cell: (props) => (
                <>
                    <Button size="xs" onClick={() => handleAction(props)}>
                        Edit
                    </Button>
                    <Button size="xs" onClick={() => handleAction(props)}>
                        Delete
                    </Button>
                </>
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await axios.post('/api/schedule/data', tableData)
            console.log('response')
            console.log(response)
            if (response.data) {
                setData(response.data.data)
                setLoading(false)
                setTableData((prevData) => ({
                    ...prevData,
                    ...{ total: response.data.total },
                }))
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tableData.pageIndex,
        tableData.sort,
        tableData.pageSize,
        tableData.query,
    ])

    return (
        <>
            <div className="flex justify-end mb-4">
                <Input
                    ref={inputRef}
                    placeholder="Search..."
                    size="sm"
                    className="lg:w-52"
                    onChange={handleChange}
                />
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
        </>
    )
}

export default ViewSchedule
