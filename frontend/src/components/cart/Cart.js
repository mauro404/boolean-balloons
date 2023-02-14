import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Row, Container, Stack } from "react-bootstrap";


import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Shopping Cart'} />
            {cartItems.length === 0 ? <Container className="LoginPage">
                <img
                    className="mb-4"
                    src="../../images/logo2.png"
                    alt="logo"
                    width="66px"
                />
                <h1 className="h3 mb-3 fw-normal">Your cart is Empty</h1>
                </Container> : (
                <Container>
                    <h1 className="h3 mb-3 fw-normal mt-4">Your Cart</h1>
                    <hr className="mt-3"/>

                    {cartItems.map(item => (
                        <Row className="d-flex justify-content-between align-items-center" key={item.product}>
                            <Col md="2" lg="2" xl="2">
                                <img className="rounded-3"src={item.image} alt={item.name} height="" width="194" />
                            </Col>
                            <Col md="3" lg="3" xl="3">
                                <h6><Link style={{ textDecoration: "none", color: "black" }} to={`/product/${item.product}`}>{item.name}</Link></h6>
                                <h6 className="text-muted text-black mb-0" style={{ fontSize: ".75rem" }}>
                                    Unit price: ${item.price.toFixed(2)}
                                </h6>
                            </Col>

                            <Col className="col-12 col-lg-6 d-flex">
                                <Col className="col-6 col-lg-9">
                                    <div></div>
                                </Col>
                                <Col className="col-6 col-lg-4">
                                    <Stack direction='horizontal' className=''>
                                        <span className="btn btn-light minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                        <input type="number" className="form-control count text-center" value={item.quantity} readOnly />
                                        <span className="btn btn-light plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                        <Col className="col-1 col-lg-2">   
                                        </Col>
                                        <span className="" style={{ color: "#0D6EFD" }}>
                                        ${((item.price)*(item.quantity)).toFixed(2)}
                                        </span>
                                    </Stack>
                                </Col>

                                <Col className="col-1 col-lg-1">   
                                </Col>
                            </Col>

                            <Col className="col-1 col-lg-1 text-end">
                                <i id="delete_cart_item" className="fa fa-trash" onClick={() => removeCartItemHandler(item.product)} ></i>
                            </Col>

                            <hr className="mt-3"/>
                        </Row>
                    ))}

                        <Row className="text-end mb-4 justify-content-end">
                                <p> Items Price:{" "}
                                    <span>
                                        ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                                    </span>
                                </p>

                                <hr />
                                <Col md="2" lg="2" xl="2">
                                <Button id="checkout_btn" className="btn btn-lg" onClick={checkoutHandler}>
                                    Check out
                                </Button>
                                </Col>
                        </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default Cart
