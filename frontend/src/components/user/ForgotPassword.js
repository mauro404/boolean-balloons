import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message)
        }
    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />

            <div className="LoginPage">
                <Form className="" onSubmit={submitHandler}>
                <img
                    className="mb-4"
                    src="../../images/logo2.png"
                    alt="logo"
                    width="66px"
                />
                <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
                <Form.Group>
                    <FloatingLabel
                    label="Email Address"
                    className="mb-3"
                    >
                    <Form.Control
                        required
                        type="email"
                        className="form-control mb-3"
                        id="email_field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </FloatingLabel>
                </Form.Group>
                <Button
                    id="forgot_password_button"
                    type="submit"
                    className="mb-3 btn-lg w-100"
                    disabled={loading ? true : false} >
                    Send Email
                </Button>

                </Form>
            </div>

        </Fragment>
    )
}

export default ForgotPassword
