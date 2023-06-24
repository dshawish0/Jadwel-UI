import React from 'react';
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui';
import { PasswordInput, ActionLink } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name or user id'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
    } = props;

    const [message, setMessage] = useTimeOutMessage();

    const { signIn } = useAuth();

    const onSignIn = async (values, setSubmitting) => {
        const { userName, password } = values;
        setSubmitting(true);

        const result = await signIn({ user_id: userName, password });

        if (result.status === 'failed') {
            setMessage(result.message);
        }

        setSubmitting(false);
    };

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting);
                    } else {
                        setSubmitting(false);
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="User Name or User Id"
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder="User Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <a 
    href="https://www.upload-apk.com/en/lGhPEi07eFbqfFV"
    target="_blank"
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        color: "black",
        padding: "15px",
        borderRadius: "50px",
        border: "2px solid white", 
        boxShadow: "0px 0px 20px rgba(70,130,180,0.3)", 
        width: "250px",  // Increased width to keep the text on the same line
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.3s ease",
        fontFamily: "'Nunito', sans-serif",
        whiteSpace: "nowrap", // To prevent wrapping of text
        overflow: "hidden",
        textOverflow: "ellipsis",
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
>
    <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg"
        alt="Android Logo"
        style={{
            marginRight: "10px",
            width: '30px',   // Increased size of image
            height: '30px',  // Increased size of image
        }}
    />
    Download Jadwel App
</a>

</div>


        </div>
    );
}

export default SignInForm;
