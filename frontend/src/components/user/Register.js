import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap'

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const avatar = '/images/default_avatar.png'
    // const [avatar, setAvatar] = useState('/images/default_avatar5.png')
    // const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar2.png')

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, toast, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })

        // if (e.target.name === 'avatar') {

        //     const reader = new FileReader();

        //     reader.onload = () => {
        //         if (reader.readyState === 2) {
        //             setAvatarPreview(reader.result)
        //             setAvatar(reader.result)
        //         }
        //     }

        //     reader.readAsDataURL(e.target.files[0])

        // } else {
        //     setUser({ ...user, [e.target.name]: e.target.value })
        // }
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <Container className="col-lg-4 col-md-6 text-center my-5">
                <Form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                    <img
                        className="mb-2"
                        src="../../images/logo2.png"
                        alt="logo"
                        width="66px"
                    />
                    <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

                    <Form.Group>
                        <FloatingLabel
                        label="Name"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="name"
                            className="form-control mb-3"
                            id="floatingInput"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                        </FloatingLabel>
                    </Form.Group>

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
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    {/* <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar Preview'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept="iamges/*"
                                    onChange={onChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div> */}

                    <Button
                        id="register_button"
                        type="submit"
                        className="mb-3 btn-lg w-100"
                        disabled={loading ? true : false}
                    >
                        Sign Up
                    </Button>
                </Form>
            </Container>

        </Fragment>
    )
}

export default Register
