import { Chart } from 'components/shared'
import { useNavigate } from 'react-router-dom';
import { COLORS } from 'constants/chart.constant'
import React, { useState } from 'react'
import {Dialog} from 'components/ui';
import { DatePicker } from 'components/ui'
import { Button } from 'components/ui'
import { HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn } from 'react-icons/hi'
const { DatePickerRange } = DatePicker

const GenrateSchedule = () => {
    const { DateTimepicker } = DatePicker
    const [loading, setLoading] = useState(false)

    const onClick = () => {
        navigate('/FullSchedule')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const onClick1 = () => {
        navigate('/DateTimePicker')
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const navigate = useNavigate()

    const data = [
        {
            name: 'All days',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Sun  , teu , thr',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'mon , wed',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]
    const data1 = [
        {
           
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = async (selectedDateTime) => {
        try {
          setLoading(true);
      
          const { date, time } = selectedDateTime;
          const requestData = {
            date,
            time,
          };
      
          const response = await fetch('https://api.example.com/schedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          // Rest of the code...
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
          setIsOpen(false);
        }
      };
      
    return (
        <div>
            <div className="flex-wrap inline-flex xl:flex items-center gap-2">
            <Dialog isOpen={dialogIsOpen} closable={false}>
                <h5 className="mb-4">Start Registration</h5>
              
                <DatePickerRange placeholder="Select dates range" />

              
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
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        'Software Design  ',
                        'Software Testing',
                        'Client Server',
                        'OOP',
                        'Documention',
                        'HCI',
                        'Security',
                        'Data ',
                   

                  
                 
                    ],
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} `,
                    },
                },
            }}
            series={data1}
            height={300}
            type="bar"
        />
            <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%',
                        endingShape: 'rounded',
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        'Software Design  ',
                        'Software Testing',
                        'Client Server',
                        'OOP',
                        'Documention',
                        'HCI',
                        'Security',
                        'Data ',
                   

                  
                 
                    ],
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} `,
                    },
                },
            }}
            series={data}
            height={300}
            type="bar"
        />
        
          <Chart
            options={{
                colors: COLORS,
                labels: ['Software Design  ',
                'Software Testing',
                'Client Server',
                'OOP' , 'Documention'],
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
            series={[44, 55, 13, 43, 22]}
            height={300}
            type="pie"
        />
        </div>
    )
}

export default GenrateSchedule
