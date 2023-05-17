import React, { useState, useEffect } from 'react';
import { Button, Select, FormItem, FormContainer } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import { Alert } from 'components/ui'; // Add the import statement for 'Alert'

const validationSchema = Yup.object().shape({
  multipleSelect: Yup.array().min(1, 'At least one course must be selected!'),
});

const UploadOfferCourses = () => {
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetch('/api/courses')
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

    const selectedCourses = values.multipleSelect.map((course) => course.value);

    // Make the API call to submit the selected courses
    fetch('/api/save-suggested-courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courses: selectedCourses }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Suggested courses saved:', data);
        setShowSuccessMessage(true);
        resetForm();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Hide the success message after 3 seconds
      })
      .catch((error) => {
        console.error('Error saving suggested courses:', error);
        setSubmitError('Failed to save suggested courses. Please try again.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div dir="ltr">
        <Alert showIcon style={{ margin: '0 auto 20px', textAlign: 'center' }}>
          المساقات التي سوف تطرح على الفصل الدراسي القادم
        </Alert>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          multipleSelect: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, resetForm, setFieldValue }) => (
          <Form>
            <FormContainer>
              <FormItem label="Courses:" errorMessage={errors.multipleSelect}>
                <Field name="multipleSelect">
                  {({ field }) => (
                    <Select
                      componentAs={CreatableSelect}
                      {...field}
                      options={courses.map((course) => ({
                        value: course.course_id,
                        label: course.name,
                      }))}
                      onChange={(options) => setFieldValue(field.name, options)}
                      isMulti
                    />
                  )}
                </Field>
              </FormItem>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  {submitError}
                </div>
              )}

              {showSuccessMessage && (
                <div
                
                >
                     <Alert className="mb-4" type="success" showIcon>
                     تم طرح المساقات بنجاح            </Alert>
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

export default UploadOfferCourses;
