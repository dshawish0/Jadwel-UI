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
    const [name, Setname] = useState('')
    const [studentName, setStudentName] = useState('')

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

    const columns = [
        {
            header: 'Course name',
            accessorKey: 'course_name',
        },
        {
            header: 'departments',
            accessorKey: 'department_name',
        },
        {
            header: 'Days',
            accessorKey: 'days',
        },
    ]

    const fetchData = async () => {
        setLoading(true)
        const stdId = sessionStorage.getItem('StudentIdContext')

        const response = await axios.get(
            `/api/suggestedStudentSchedule/${stdId}`,
            tableData
        )

        if (response.data && response.data.length > 0) {
            setData(response.data)
            setStudentName(response.data[0].user_name) // Assuming 'user_name' is the student name
            setLoading(false)
            setTableData((prevData) => ({
                ...prevData,
                ...{ total: response.data.total },
            }))
        }
    }

    useEffect(() => {
        fetchData()
    }, [
        tableData.pageIndex,
        tableData.sort,
        tableData.pageSize,
        tableData.query,
    ])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h1
                    style={{
                        color: '#3c4146',
                        fontSize: '2rem',
                        fontWeight: 600,
                        marginBottom: '2rem',
                        borderBottom: '2px solid #3c4146',
                        paddingBottom: '0.5rem',
                        display: 'inline-block',
                    }}
                >
                    {studentName}
                </h1>
            </div>
            <DataTable columns={columns} data={data} loading={loading} />
        </AdaptableCard>
    )
}

export default CompareSchedule
