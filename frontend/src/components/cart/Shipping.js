import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from 'countries-list'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'

import { Button, Form, FloatingLabel, Breadcrumb } from "react-bootstrap";

const Shipping = () => {

    const navigate = useNavigate()
    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        navigate('/order/confirm')
    }

    return (
        <Fragment>

            <MetaData title={'Shipping Info'} />
            
            <Breadcrumb className='mt-4 px-4'>
                <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
                <Breadcrumb.Item >Confirm Order</Breadcrumb.Item>
                <Breadcrumb.Item >Payment</Breadcrumb.Item>
            </Breadcrumb>

            <div className="LoginPage">
                <img
                    className="mb-4"
                    src="../../images/logo2.png"
                    alt="logo"
                    width="66px"
                />
                <Form className="" onSubmit={submitHandler}>
                    {/* <h1 className="h3 mb-3 fw-normal">Shipping Info</h1> */}
                    <Form.Group>
                        <FloatingLabel
                        label="Address"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="text"
                            className="form-control mb-3"
                            id="floatingInput"
                            // name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="City"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="text"
                            className="form-control mb-3"
                            id="floatingInput"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="Phone Number"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="phone"
                            className="form-control mb-3"
                            id="floatingInput"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="Postal Code"
                        className="mb-3"
                        >
                        <Form.Control
                            required
                            type="number"
                            className="form-control mb-3"
                            id="floatingInput"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                        label="Country"
                        className="mb-3"
                        >
                            <Form.Select
                                required
                                type="number"
                                className="form-control mb-3"
                                id="floatingInput"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

                    <Button
                        type="submit"
                        className="mb-3 btn-lg w-100"
                    >
                        Continue
                    </Button>
                </Form>
            </div>
            

        </Fragment>
    )
}

export default Shipping
