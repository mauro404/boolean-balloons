import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const UpdateUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const userId = params.id;

    useEffect(() => {
        console.log(user && user._id !== userId);
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('User updated successfully')

            navigate('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }
    }, [dispatch, error, navigate, isUpdated, userId, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-8">
                    <div className="row wrapper">
                        <div className="col-8 col-lg-5 LoginPage">
                            <Form className="" onSubmit={submitHandler}>
                                <h1 className="h3 mb-3 fw-normal">Update User</h1>

                                <Form.Group>
                                  <FloatingLabel
                                  label="Name"
                                  className="mb-3"
                                  >
                                  <Form.Control
                                      required
                                      type="name"
                                      className="form-control mb-3"
                                      id="name_field"
                                      name="name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                  />
                                  </FloatingLabel>
                                </Form.Group>

                                <Form.Group>
                                  <FloatingLabel
                                  label="Email"
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

                                <Form.Group>
                                  <FloatingLabel
                                  label="Role"
                                  className="mb-3"
                                  >
                                  <Form.Select
                                      required
                                      className="form-control mb-3"
                                      id="role_field"
                                      name="role"
                                      value={role}
                                      onChange={(e) => setRole(e.target.value)}
                                  >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                  </Form.Select>
                                  </FloatingLabel>
                                </Form.Group>

                                <Button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser
