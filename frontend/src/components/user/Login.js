import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap'

const Login = ({ location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    const redirect = location?.search ? location?.search.split('=')[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            <MetaData title={'Login'} />
            {loading ? <Loader /> : (
                <Container className='col-lg-4 col-md-6 text-center my-5'>
                    <Form className="" onSubmit={submitHandler}>
                        <img
                            className="mb-2"
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
                </Container>
            )}
        </Fragment>
    )
}

export default Login
