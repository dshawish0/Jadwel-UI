import React, { useState, useEffect } from 'react'
import {
    Button,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Alert } from 'components/ui'
import { apiCreateSchedule } from 'services/scheduleService'
import { cloneDeep } from 'lodash'
import useUniqueId from 'components/ui/hooks/useUniqueId'
import { HiPlusCircle } from 'react-icons/hi'

const daysOptions = [
    {
        value: 'Sunday - Tuesday - Thursday',
        label: 'Sunday - Tuesday - Thursday',
    },
    { value: 'Monday - Wednesday', label: 'Monday - Wednesday' },
    { value: 'all', label: 'All Days' },
]

const departmentsOption = [
    {
        value: 'Engineering',
        label: 'Engineering',
    },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Mathematics', label: 'Mathematics' },
]

const coursesOptions = [
    {
        value: 'Introduction to Programming',
        label: 'Introduction to Programming',
    },
    {
        value: 'Data Structures and Algorithms',
        label: 'Data Structures and Algorithms',
    },
    { value: 'Web Development', label: 'Web Development' },
    {
        value: 'Mobile Application Development',
        label: 'Mobile Application Development',
    },
    {
        value: 'Artificial Intelligence',
        label: 'Artificial Intelligence',
    },
]

const validationSchema = Yup.object().shape({
    days: Yup.array()
        .required('Please select at least one day!')
        .min(1, 'Please select at least one day!'),
    college: Yup.object().required('Please select a college!'),
    departments: Yup.object().required('Please select at least one department!'),

    courses: Yup.object().required('Please select at least one course!')
        
      
})

const CreatableSelect = ({ fetchData }) => {
    const addSchedule = async (data) => {
        const response = await apiCreateSchedule(data)
        return response.data
    }

    /**
     * Handles form submission.
     * @param {object} values - Form values.
     * @param {object} formikBag - Formik bag.
     */
    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addSchedule(values)
        setSubmitting(false)
        onDialogOk()
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Schedule successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            return fetchData()
        }
    }

    const type = 'new'
    const newId = useUniqueId('schedule-')

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [collegeOptions, setCollegeOptions] = useState([])

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch('/api/collages') // Replace with the correct API endpoint, e.g., '/api/colleges'
                const data = await response.json()
                const options = data.map((college) => ({
                    value: college.collageId, // Use the name property as the value
                    label: college.name, // Use the name property as the label
                }))
                setCollegeOptions(options)
            } catch (error) {
                console.error('Error fetching colleges:', error)
            }
        }

        fetchColleges()
    }, [])
    const openDialog = (props) => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        setIsOpen(false)
    }

    const [departmentOptions, setDepartmentOptions] = useState([])
    const fetchDepartments = async (collage_id) => {
       
            try {
                const response = await fetch(`/api/departments/${collage_id}`)
                const data = await response.json()
                const options = data.map((department) => ({
                    value: department.departmentId,
                    label: department.name,
                }))
                setDepartmentOptions(options)
            } catch (error) {
                console.error('Error fetching departments:', error)
            }
        
    }

    //
    const [courseOptions, setCourseOptions] = useState([])

    const fetchCourses = async (dep_id) => {
        try {
            const response = await fetch(`/api/courses/${dep_id}`)
            const data = await response.json()
            const options = data.map((course) => ({
                value: course.course_id,
                label: course.name,
            }))
            setCourseOptions(options)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    return (
        <>
            <Button
                shape="circle"
                size="sm"
                variant="twoTone"
                onClick={openDialog}
                icon={<HiPlusCircle size={'25px'} />}
            />

            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Add New Course</h5>

                <Alert showIcon>
                    {
                        ' عليك الرجوع دائماً إلى التعليمات في دليل الطالب والالتزام بها.'
                    }
                </Alert>

                <Formik
                    enableReinitialize
                    initialValues={{
                        days: [],
                        college: '',
                        departments:'',
                        courses:'' ,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const days = values.days.map((day) => day.value)
                        const college = values.college.value
                        const department_id = values.departments.value
                        const course = values.courses.label

                        const convertedData = {
                            // days,
                            // college,
                            department_id,
                            name: course,
                        }
                     
                        const formData = cloneDeep(convertedData)
                    
                        handleFormSubmit(formData, setSubmitting)
                    }}
                >
                    {({ values, touched, errors, resetForm }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    asterisk
                                    label="Days"
                                    invalid={Boolean(
                                        errors.days && touched.days
                                    )}
                                    errorMessage={errors.days}
                                >
                                    <Field name="days">
                                        {({ field, form }) => (
                                            <Select
                                                isMulti
                                                field={field}
                                                form={form}
                                                options={daysOptions}
                                                value={values.days}
                                                onChange={(option) => {
                                                    if (
                                                        option.some(
                                                            (option) =>
                                                                option.value ===
                                                                'all'
                                                        )
                                                    ) {
                                                        form.setFieldValue(
                                                            field.name,
                                                            daysOptions.filter(
                                                                (days) =>
                                                                    days.value !==
                                                                    'all'
                                                            )
                                                        )
                                                    } else {
                                                        form.setFieldValue(
                                                            field.name,
                                                            option
                                                        )
                                                    }
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    label="College"
                                    asterisk
                                    invalid={Boolean(
                                        errors.college && touched.college
                                    )}
                                    errorMessage={errors.college}
                                >
                                    <Field name="college">
                                        {({ field, form }) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                options={collegeOptions}
                                                value={values.college}
                                                onChange={(option) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        option
                                                    )
                                                    console.log(option)
                                                    fetchDepartments(
                                                        option.value
                                                    )
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Departments"
                                    invalid={Boolean(
                                        errors.departments &&
                                            touched.departments
                                    )}
                                    errorMessage={errors.departments}
                                >
                                    <Field name="departments">
                                        {({ field, form }) => (
                                            <Select
                                                isDisabled={
                                                    departmentOptions.length < 1
                                                }
                                                field={field}
                                                form={form}
                                                options={departmentOptions}
                                                value={values.departments}
                                                onChange={(option) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        option 
                                                    )
                                                    fetchCourses(option.value)
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Courses"
                                    invalid={Boolean(
                                        errors.courses && touched.courses
                                    )}
                                    errorMessage={errors.courses}
                                >
                                    <Field name="courses">
                                        {({ field, form }) => (
                                            <Select
                                                isDisabled={
                                                    courseOptions.length < 1
                                                }
                                                field={field}
                                                form={form}
                                                options={courseOptions}
                                                value={values.courses}
                                                onChange={(option) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        option
                                                    )
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem className="mt-4">
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                    <Button variant="solid" type="submit">
                                        Submit
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

export default CreatableSelect
