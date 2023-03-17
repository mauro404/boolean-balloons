import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { toast } from 'react-toastify'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'
import Row from 'react-bootstrap/Row'

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return toast.error(error)
        }

        dispatch(getProducts());

    }, [dispatch, error])

    return (
        <>
            {loading ? <Loader /> : (
                <div>
                    <MetaData title={'Home'} />
                    <img className="" src="../images/hero-home.png" alt="hero-home" width="100%"/>
                    <h1 style={{ paddingTop: '2%', textAlign: 'center' }}>Highlights</h1>

                    <Row xs={1} md={2} lg={4} className="g-4" style={{ paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: "2%"}} >
                            {products && products.slice(0,4).map(product => (
                                <Product key={product._id} product={product} />
                            ))
                            }

                    </Row>
                </div>
            )}
        </>
    )
}

export default Home
