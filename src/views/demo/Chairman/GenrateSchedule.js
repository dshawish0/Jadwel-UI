import { Chart } from 'components/shared'
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react'
import { Button } from 'components/ui'
import { HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn } from 'react-icons/hi'
const GenrateSchedule = () => {
    const uniqueVisitorsData = {
        series: [
            {
                name: 'Students want this course',
                data: [45, 52, 38, 24, 33, 26, 21],
            },
        ],
        categories: [
            'Software Design ',
            'Android',
            'Software Decumintaion',
            'Software Modeling',
            'Software Testing',
            'Client Server',
            'Web Engineering',
        ],
    }
    const [loading, setLoading] = useState(false)

    const onClick = () => {
        navigate('/FullSchedule')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const navigate = useNavigate()

 
    return (
        <div>
            <div className="flex-wrap inline-flex xl:flex items-center gap-2">
                <Button
                    className="mr-2"
                    variant="solid"
                    onClick={onClick}
                    loading={loading}
                    icon={<HiOutlineInboxIn />}
                >
                    <span>Generate the schedule</span>
                </Button>
            </div>
            <Chart
                series={uniqueVisitorsData.series}
                xAxis={uniqueVisitorsData.categories}
                title="Unique Visitors"
                height={410}
                type="bar"
                customOptions={{
                    colors: ['#ef4444', '#10b981'],
                }}
            />
        </div>
    )
}

export default GenrateSchedule
