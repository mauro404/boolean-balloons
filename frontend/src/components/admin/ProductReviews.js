import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Table, Container } from 'react-bootstrap'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            toast.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET })
        }
    }, [dispatch, error, productId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-8">
                    <Container>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        Search
								                    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <Table striped bordered>
                              <thead>
                                <tr>
                                  <th>Review ID</th>
                                  <th>Rating</th>
                                  <th>Comment</th>
                                  <th>User</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reviews?.map(review => (
                                  <tr>
                                    <td>{review._id}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.name}</td>
                                    <td>
                                      <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                        ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}


                    </Container>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductReviews
