import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Product from '../product/Product'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../../actions/productActions'

import Row from 'react-bootstrap/Row';

const ProductList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts());


    }, [dispatch, alert, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div>
                    <MetaData title={'Products'} />
                    <img className="" src="../images/hero-products.png" alt="hero-products" width="100%"/>
                    <h1 style={{ paddingTop: '2%', textAlign: 'center' }}>All Balloons</h1>

                    <Row xs={1} md={2} lg={4} className="g-4" style={{ paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: "3%"}} >
                            {products?.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                            }

                    </Row>
                </div>
            )}

        </Fragment>
    )
}

export default ProductList;
