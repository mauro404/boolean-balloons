import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    // const alert = useAlert();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            // alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                // alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    navigate('/success')
                } else {
                    // error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            // alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="LoginPage">
                <Form className="" onSubmit={submitHandler}>
                    <h1 className="h3 mb-3 fw-normal">Card Info</h1>
                    <Form.Group>
                        <FloatingLabel
                        label="Card Number"
                        className="mb-3"
                        >
                        <CardNumberElement
                            required
                            type="text"
                            className="form-control mb-3"
                            id="floatingInput"
                            options={options}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="Card Expiry"
                        className="mb-3"
                        >
                        <CardExpiryElement
                            required
                            type="text"
                            className="form-control mb-3"
                            id="floatingInput"
                            options={options}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="Card CVC"
                        className="mb-3"
                        >
                        <CardCvcElement
                            required
                            type="text"
                            className="form-control mb-3"
                            id="floatingInput"
                            options={options}
                        />
                        </FloatingLabel>
                    </Form.Group>


                    <Button
                        id="pay_btn"
                        type="submit"
                        className="mb-3 btn-lg w-100"
                    >
                        Pay {` - $${orderInfo && orderInfo.totalPrice}`}
                    </Button>

                </Form>
            </div>

        </Fragment>
    )
}

export default Payment
