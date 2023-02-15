import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrdersList from '../order/OrdersList'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'

import { myOrders, clearErrors } from '../../actions/orderActions'
import { Col, Row, Container, Card } from "react-bootstrap";

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    const { shippingInfo } = useSelector(state => state.cart)

    const dispatch = useDispatch();
    const { error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
    
        if (error) {
          dispatch(clearErrors())
        }
      }, [dispatch, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Container>
                    <MetaData title={'Profile'} />

                    <h2 className="mt-5 ml-5"></h2>
                    <Row className='mb-5'>
                        <Col lg={4}>
                            <Card className="bg-light">
                                <Card.Body className="text-center">
                                    <Card.Img className="rounded-circle img-fluid" variant="top" src={user.avatar.url} alt={user.name} style={{ width: "150px" }}/>
                                    <Card.Title className="py-3">{user.name}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                    <Card.Text className='text-muted mb-1'>{shippingInfo.address}</Card.Text>
                                    <Card.Text className='text-muted mb-1'>{shippingInfo.city} - {shippingInfo.postalCode}</Card.Text>

                                    <Card.Text className='text-muted mb-1'>{shippingInfo.phoneNo}</Card.Text>
                                    <Card.Text className='text-muted'>{shippingInfo.country}</Card.Text>
                                    <p>Joined at: {String(user.createdAt).substring(0, 10)}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        {/* <Link to="/me/update" id="edit_profile" className="btn btn-primary">
                                            Edit Profile
                                        </Link> */}
                                        <Link to="/password/update" className="btn btn-outline-primary ms-1">
                                            Change Password
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={8}>
                        {orders && orders.length === 0 ? <Container className="LoginPage">
                            <img
                                className="mb-4"
                                src="../../images/logo2.png"
                                alt="logo"
                                width="66px"
                            />
                            <h1 className="h3 mb-3 fw-normal">There are no Orders</h1>
                            </Container> : (<Container>
                            <h2 className="my-3 px-3">My Orders</h2>
                            <OrdersList /> </Container>)}
                        </Col>

                    </Row> 
                </Container>
            )}
        </Fragment>
    )
}

export default Profile
