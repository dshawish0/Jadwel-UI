import React, { useState, useEffect } from 'react';
import {
  Button,
  Select,
  FormItem,
  FormContainer,
  Alert,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  multipleSelect: Yup.array().min(1, 'At least one is selected!'),
  message: Yup.string().required('Message is required'),
});

const SuggestedCourse = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetch('/api/courses/0')
      .then((response) => response.json())
      .then((data) => {
        const activeCourses = data.filter((course) => course.is_active);
        setCourses(activeCourses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    setSubmitting(true);
    setSubmitError(null);

    fetch('/api/save-suggested-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Suggested course saved:', data);
        alert('Suggested course saved successfully!');
        resetForm();
      })
      .catch((error) => {
        console.error('Error saving suggested course:', error);
        setSubmitError('Failed to save suggested course. Please try again.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, resetForm, setFieldValue }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Course: "
                errorMessage={errors.multipleSelect}
              >
                <Field name="multipleSelect">
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
                {errors.message && (
                  <div style={{ color: 'red' }}>{errors.message}</div>
                )}
              </FormItem>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  {submitError}
                </div>
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
                <Button variant="solid" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
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
