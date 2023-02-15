import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    // const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            // alert.success('Password updated successfully')
            navigate('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="LoginPage">
                <Form className="" onSubmit={submitHandler}>
                    <img
                        className="mb-4"
                        src="../../images/logo2.png"
                        alt="logo"
                        width="66px"
                    />
                    <h1 className="h3 mb-3 fw-normal">Update Password</h1>

                    <Form.Group>
                        <FloatingLabel
                        label="Current Password"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="password"
                            className="form-control mb-3"
                            id="floatingInput"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="New Password"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="password"
                            className="form-control mb-3"
                            id="floatingInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>


                    <Button className="mb-3 btn-lg w-100" variant="primary" type="submit">
                        Update Password
                    </Button>

                </Form>
                
            </div>

        </Fragment>
    )
}

export default UpdatePassword
