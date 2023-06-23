import { Chart } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import React, { useState , useEffect } from 'react'
import { Dialog } from 'components/ui'
import { DatePicker } from 'components/ui'
import { Button } from 'components/ui'
import jwt from 'jwt-decode'
import { HiOutlineInboxIn } from 'react-icons/hi'
import axios from 'axios'

const { DatePickerRange } = DatePicker

const COLORS = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624', '#D7263D', '#1B998B', '#2E294E', '#F46036', '#E2C044'];

const GenrateSchedule = () => {
    const { DateTimepicker } = DatePicker
    const [pieColors, setPieColors] = useState([]);

    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [pieLabels, setPieLabels] = useState([]);
    const [loading, setLoading] = useState(false)
    const [startRegister, setStartRegister] = useState(null);
    const [endRegister, setEndRegister] = useState(null);
    const navigate = useNavigate()
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]) // null for start and end date

    const onClick = () => {
        navigate('/FullSchedule')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const handleDateChange = (dates) => {
        setSelectedDateRange(dates)
        
    }

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // JS months are 0-based
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}/${month}/${day}`
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        const decodedToken = jwt(token)
        const departmentId = decodedToken.departmentId
        fetch(`/api/suggestedStudentSchedule/${departmentId}/statistics`)
            .then((response) => response.json())
            .then((data) => {
                let chartData = [
                    
                    { name: 'Sun, Tue, Thu', data: [], color: COLORS[0] },
                    { name: 'Mon, Wed', data: [], color: COLORS[1] },
                    { name: 'Sun, Tue, Thu, Mon, Wed', data: [], color: COLORS[2] }
                ];
    
                let categories = [];
                let pieData = [];
                let pieLabels = [];
                let pieColors = [];
    
                data.forEach((item, index) => {
                    categories.push(item.course.name); 
                    pieLabels.push(item.course.name);
                    
               
                    let sunTueThuData = item.scheduleStatistics["Sunday - Tuesday - Thursday"]
                      ? item.scheduleStatistics["Sunday - Tuesday - Thursday"].student_count
                      : 0;
                    let monWedData = item.scheduleStatistics["Monday - Wednesday"]
                      ? item.scheduleStatistics["Monday - Wednesday"].student_count
                      : 0;
                    let combinedData = item.scheduleStatistics["Sunday - Tuesday - Thursday, Monday - Wednesday"]
                      ? item.scheduleStatistics["Sunday - Tuesday - Thursday, Monday - Wednesday"].student_count
                      : 0;
    
                    let totalData =  sunTueThuData + monWedData + combinedData;
                    pieData.push(totalData);
                    pieColors.push(COLORS[index % COLORS.length]);  // associate each course with a color
    
                    chartData[0].data.push(sunTueThuData);
                    chartData[1].data.push(monWedData);
                    chartData[2].data.push(combinedData);
                });
    
                setChartData(chartData);
                setCategories(categories);
                setPieData(pieData);
                setPieLabels(pieLabels);
                setPieColors(pieColors);  // save the colors for the pie chart
            })
            .catch((error) => console.error(error));
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const decodedToken = jwt(token)
                const departmentId = decodedToken.departmentId
                const response = await axios.get(`/api/date/${departmentId}`);
                if (response.data) {
                    setStartRegister(response.data.startRegister);
                    setEndRegister(response.data.endRegister);
                }
            } catch (error) {
                console.error("An error occurred while fetching the data:", error);
            }
        };

        fetchData();
    }, []);

    const onClick1 = () => {
        navigate('/DateTimePicker')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }

    const onDialogOk = async (selectedDateTime) => {
        try {
            if (selectedDateRange[0] && selectedDateRange[1]) {
                const formattedStartDate = formatDate(selectedDateRange[0])
                const formattedEndDate = formatDate(selectedDateRange[1])

                setLoading(true)

                const { startRegister, endRegister } = selectedDateTime
                const token = sessionStorage.getItem('token')
                const decodedToken = jwt(token)
                const departmentId = decodedToken.departmentId
                const requestData = {
                    startRegister: formattedStartDate,
                    endRegister: formattedEndDate,
                    department_id: departmentId,
                }
                const response = await fetch('/api/date', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <div>
            <div className="flex-wrap inline-flex xl:flex items-center gap-2">
            <Dialog isOpen={dialogIsOpen} closable={false}>
                    <h5 className="mb-4">Start Registration</h5>

                    <DatePickerRange
                        placeholder="Select dates range"
                        value={selectedDateRange}
                        onChange={handleDateChange}
                    />

                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog>
                <Button
                    className="mr-2"
                    variant="solid"
                    onClick={onClick}
                    loading={loading}
                    icon={<HiOutlineInboxIn />}
                >
                    <span>Analysis schedule</span>
                </Button>
                <Button
                    className="mr-2"
                    variant="solid"
                    onClick={openDialog}
                    loading={loading}
                    icon={<HiOutlineInboxIn />}
                >
                    <span>Open registration</span>
                </Button>
                {startRegister && <span>Start Date: {startRegister} </span>}
                {endRegister && <span>End Date: {endRegister}</span>}
            </div>
            <Chart
                options={{
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '50%',
                            endingShape: 'rounded',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent'],
                    },
                    xaxis: {
                        categories: categories,
                        labels: {
                            style: {
                                fontSize: '9.2px',
                            },
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Total students',
                        },
                    },
                    fill: {
                        opacity: 1,
                        colors: COLORS
                    },
                }}
                series={chartData}
                height={400}
                type="bar"
            />
            <Chart
                options={{
                 
                    colors: pieColors,
                    labels: pieLabels,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={pieData}
                height={300}
                type="pie"
            />
        </div>
    )
}

export default GenrateSchedule


