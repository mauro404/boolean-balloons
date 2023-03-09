import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import { toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import AdminNav from './AdminNav'
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
        <Container className="px-2 px-md-0 px-lg-5 table-responsive">
          <MetaData title={'All Orders'} />
          <AdminNav />

          <h3 className="py-4">All Orders</h3>

          {loading ? <Loader /> : (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order => (
                    <tr>
                      <td>{order._id}</td>
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
    )
}

export default OrdersListAdm
