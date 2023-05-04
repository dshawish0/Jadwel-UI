import React, { useState } from 'react'
import {
    Button,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import { Alert } from 'components/ui'

const options = [
    { value: 'Sunday , Tuesday , Thursday', label: 'Sunday , Tuesday , Thursday' },
    { value: 'Monday , Wednesday', label:  'Monday , Wednesday' },
    { value: 'All Days', label: 'All Days' },
]
const options1 = [
  { value: 'Computer adn Information Technonlogy', label: 'Computer adn Information Technonlogy' },
  { value: 'Medcine', label:  'Monday , Wednesday' },
  { value: 'Engineering', label: 'Engineering' },
]

const validationSchema = Yup.object().shape({
    multipleSelect: Yup.array().min(1, 'At least one is selected!')
  
})

const SuggestedCourse = () => {
    const [message, setMessage] = useState('')

    return (
        <div>
            <div dir="ltr">
                <Alert showIcon style={{ margin: '0 auto 20px', textAlign: 'center' }}>
                    المساق غير موجود في الجدول اذكر ووضح لماذا ترغب بتسجيله
                </Alert>
            </div>  

            <Formik
                enableReinitialize
                initialValues={{
                    multipleSelect: [],
                    date: null,
                    time: null,
                    singleCheckbox: false,
                    multipleCheckbox: [],
                    radio: '',
                    switcher: false,
                    segment: [],
                    upload: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2) + '\n\nMessage: ' + message)
                        setMessage('')
                        setSubmitting(false)
                    }, 400)
                }}
            >
                {({ values, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Days: "
                                errorMessage={errors.multipleSelect}
                            >
                                <Field name="multipleSelect">
                                    {({ field, form }) => (
                                        <Select
                                            componentAs={CreatableSelect}
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={values.multipleSelect}
                                            onChange={(option) => {
                                                form.setFieldValue(field.name, option)
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem label="Message:">
                                <textarea
                                    style={{ width: '100%', height: '100px', padding: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '1px solid #ccc' }}
                                    placeholder="Enter your message here"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
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

export default SuggestedCourse