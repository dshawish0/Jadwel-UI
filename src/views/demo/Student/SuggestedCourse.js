import React, { useState, useEffect } from 'react';
import { Button, Select, FormItem, FormContainer, Alert } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import jwt from 'jwt-decode';

const validationSchema = Yup.object().shape({
  course_id: Yup.string().required('Course is required'),
  message: Yup.string().required('Message is required'),
});

const SuggestedCourse = () => {
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [dataSent, setDataSent] = useState(false);

  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwt(token);
    const departmentId = decodedToken.departmentId;
    fetch(`/api/courses/${departmentId}`)
      .then((response) => response.json())
      .then((data) => {
        const activeCourses = data.filter((course) => !course.is_active);
        setCourses(activeCourses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    setSubmitError(null);

    const token = sessionStorage.getItem('token');
    const decodedToken = jwt(token);
    const userId = decodedToken.userId;

    const requestData = {
      userId,
      course_id: values.course_id.value,
      description: values.message,
    };

    try {
      const response = await fetch('/api/suggestedCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to save suggested course');
      }

      setDataSent(true);
      resetForm();
    } catch (error) {
      console.error('Error saving suggested course:', error);
      setSubmitError('Failed to save suggested course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div dir="ltr">
        <Alert
          showIcon
          style={{ margin: '0 auto 20px', textAlign: 'center' }}
        >
          المساق غير موجود في الجدول اذكر ووضح لماذا ترغب بتسجيله
        </Alert>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          course_id: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, resetForm, setFieldValue }) => (
          <Form>
            <FormContainer>
              <FormItem label="Course:" errorMessage={errors.course_id}>
                <Field name="course_id">
                  {({ field }) => (
                    <Select
                      componentAs={CreatableSelect}
                      {...field}
                      options={courses.map((course) => ({
                        value: course.course_id,
                        label: course.name,
                      }))}
                      onChange={(option) =>
                        setFieldValue(field.name, option)
                      }
                    />
                  )}
                </Field>
              </FormItem>

              <FormItem label="Message:">
                <textarea
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                  placeholder="Enter your message here"
                  name="message"
                  value={values.message}
                  onChange={(e) => setFieldValue('message', e.target.value)}
                />
                {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
              </FormItem>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  {submitError}
                </div>
              )}

              {dataSent && (
                <Alert className="mb-4" type="success" showIcon>
                  Sent Successfully!
                </Alert>
              )}

              <FormItem>
                <Button
                  type="reset"
                  className="ltr:mr-2 rtl:ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  disabled={submitting}
                  onClick={() => {
                    handleSubmit(values, { resetForm });
                  }}
                >
                  Submit
                </Button>
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SuggestedCourse;
