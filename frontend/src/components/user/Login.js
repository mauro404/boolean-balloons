import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const Login = ({ location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location?.search ? location?.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            navigate(redirect)
        }

        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            <MetaData title={'Login'} />
            {loading ? <Loader /> : (
                <div className='LoginPage'>
                    <Form className="" onSubmit={submitHandler}>
                        <img
                            className="mb-4"
                            src="../../images/logo2.png"
                            alt="logo"
                            width="66px"
                        />
                        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

                        <Form.Group>
                            <FloatingLabel
                            label="Email Address"
                            className="mb-3"
                            >
                            <Form.Control
                                required
                                type="email"
                                className="form-control mb-3"
                                id="floatingInput"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                            <FloatingLabel
                            label="Password"
                            className="mb-3"
                            >
                            <Form.Control
                                required
                                type="password"
                                className="form-control mb-3"
                                id="floatingPassword"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </FloatingLabel>
                        </Form.Group>

                        <Button className="mb-3 btn-lg w-100" variant="primary" type="submit">
                            Login
                        </Button>

                        <Link to="/password/forgot" className="text-decoration-none">Forgot Password?</Link>
                    </Form>
                    <br />
                    <p>Don't have an account yet?</p>
                    <Link className="text-decoration-none" to={"/register"}>
                    {" "}
                    Sign Up
                    </Link> 
                </div>
            )}
        </Fragment>
    )
}

export default Login
