import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { Table, Container } from 'react-bootstrap'

const OrdersListAdm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, error, isDeleted, navigate])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-8">
                    <Container>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <Table striped bordered>
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  {/* <th>Num of Items</th> */}
                                  <th>Amount</th>
                                  <th>Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders?.map(order => (
                                  <tr>
                                    <td>{order._id}</td>
                                    {/* <td>{order.orderItems?.length}</td> */}
                                    <td>${order.totalPrice}</td>
                                    <td>
                                      {order.orderStatus && String(order.orderStatus).includes('Delivered')
                                            ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                                            : <p style={{ color: 'red' }}>{order.orderStatus}</p>
                                      }
                                    </td>
                                    <td>
                                      <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                                          <i className="fa fa-eye"></i>
                                      </Link>
                                      <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                                          <i className="fa fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                        )}

                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default OrdersListAdm
