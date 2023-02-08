import React, { Fragment, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'

const OrdersList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors())
    }
  }, [dispatch, error])


  return (
    <Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Num of Items</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map(order => (
          <tr>
            <td>{order._id}</td>
            <td>{order.orderItems?.length}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>
              }
            </td>
            <td>
              <Link to={`/order/${order._id}`} className="btn btn-primary">
                <i className="fa fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  )
}

export default OrdersList