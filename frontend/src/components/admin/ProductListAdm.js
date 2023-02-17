import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { Table } from 'react-bootstrap'

const ProductsList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Product deleted successfully');
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, error, deleteError, isDeleted, navigate])

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-6">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                          <Table striped bordered>
                            <thead>
                              <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products?.map(product => (
                                <tr>
                                  <td>{product._id}</td>
                                  <td>{product.name}</td>
                                  <td>${product.price}</td>
                                  <td>{product.stock}</td>
                                  <td>
                                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductsList
