import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Button, Form, FloatingLabel, Breadcrumb, Container } from "react-bootstrap";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(clearCart(cartItems));

          navigate("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title={"Payment"} />

      <Breadcrumb className="mt-2 mt-lg-4 px-2 px-lg-4">
        <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>
        <Breadcrumb.Item href="/order/confirm">Confirm Order</Breadcrumb.Item>
        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="col-lg-4 col-md-6">
        <div className="my-4 h4 text-center">
          <img src="../../images/logo2.png" alt="logo" width="40px" />{" "}
          Card Information
        </div>

        <Form className="" onSubmit={submitHandler}>
          <Form.Group>
            <FloatingLabel label="Card Number" className="mb-3">
              <CardNumberElement
                required
                type="text"
                className="form-control mb-3"
                id="floatingInput"
                options={options}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel label="Card Expiry" className="mb-3">
              <CardExpiryElement
                required
                type="text"
                className="form-control mb-3"
                id="floatingInput"
                options={options}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel label="Card CVC" className="mb-3">
              <CardCvcElement
                required
                type="text"
                className="form-control mb-3"
                id="floatingInput"
                options={options}
              />
            </FloatingLabel>
          </Form.Group>

          <Button id="pay_btn" type="submit" className="mb-3 btn-lg w-100">
            Pay {` - $${orderInfo && orderInfo.totalPrice}`}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Payment;
