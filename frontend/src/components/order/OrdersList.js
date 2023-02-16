import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'
import { Table, Container } from 'react-bootstrap'

const OrdersList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }
  }, [dispatch, error])


  return (
    <Container>

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
                <Link to={`/order/${order._id}`} className="">
                  {/* <i className="fa fa-eye"></i> */}
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}

    </Container>
  )
}

export default OrdersList