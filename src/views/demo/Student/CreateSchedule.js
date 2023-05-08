import React from 'react'
import { Button, Select, FormItem, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Alert } from 'components/ui'

const daysOptions = [
    {
        value: 'Sunday , Tuesday , Thursday',
        label: 'Sunday , Tuesday , Thursday',
    },
    { value: 'Monday , Wednesday', label: 'Monday , Wednesday' },
    { value: 'all', label: 'All Days' },
]
const collegeOptions = [
    {
        value: 'Computer and Information Technology',
        label: 'Computer and Information Technology',
    },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Engineering', label: 'Engineering' },
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
    departments: Yup.array()
        .required('Please select at least one department!')
        .min(1, 'Please select at least one department!'),
    courses: Yup.array()
        .required('Please select at least one course!')
        .min(1, 'Please select at least one course!'),
})

const MixedFormControl = () => {
    /**
     * Handles form submission.
     * @param {object} values - Form values.
     * @param {object} formikBag - Formik bag.
     */
    const handleSubmit = (values, { setSubmitting }) => {
        console.log('values', values)
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <div>
            <Alert
                showIcon
                style={{ margin: '0 auto 20px', textAlign: 'center' }}
            >
                عليك الرجوع دائماً إلى التعليمات في دليل الطالب والالتزام بها.
            </Alert>

            <Formik
                enableReinitialize
                initialValues={{
                    days: [],
                    college: {},
                    departments: [],
                    courses: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Days"
                                invalid={Boolean(errors.days && touched.days)}
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
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Departments"
                                invalid={Boolean(
                                    errors.departments && touched.departments
                                )}
                                errorMessage={errors.departments}
                            >
                                <Field name="departments">
                                    {({ field, form }) => (
                                        <Select
                                            isMulti
                                            field={field}
                                            form={form}
                                            options={departmentsOption}
                                            value={values.departments}
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
                                            isMulti
                                            field={field}
                                            form={form}
                                            options={coursesOptions}
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

                            <FormItem>
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
        </div>
    )
}

export default MixedFormControl
