import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Container, Breadcrumb } from "react-bootstrap";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 50 ? 0 : 5;
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <Breadcrumb className="mt-2 mt-lg-4 px-2 px-lg-4">
        <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>
        <Breadcrumb.Item active>Confirm Order</Breadcrumb.Item>
        <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item>
      </Breadcrumb>

      <Container>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-3 order-confirm">
            <div className="mb-2 pb-4 h3 text-center">
              <img src="../../images/logo2.png" alt="logo" width="40px" />{" "}
              Confirm Order
            </div>
            {/* <h4 className="mb-3">Confirm Order</h4> */}
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone Number:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mb-2">Your Cart Items:</h4>
            <hr />

            {cartItems.map((item) => (
              <>
                <div className="cart-item my-1" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-md-2 col-lg-2">
                      <img
                        className="rounded-3"
                        src={item.image}
                        alt={item.name}
                        height=""
                        width="100"
                      />
                    </div>

                    <div className="col-4 col-md-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-md-5 col-lg-4 text-center">
                      <p>
                        {item.quantity} x ${item.price.toFixed(2)} ={" "}
                        <b>${(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Items Price:{" "}
                <span className="order-summary-values">
                  ${itemsPrice.toFixed(2)}
                </span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">
                  ${shippingPrice.toFixed(2)}
                </span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ConfirmOrder;
