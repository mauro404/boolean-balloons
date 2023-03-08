import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import { Button, Col, Row, Container, Stack } from "react-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Shopping Cart"} />
      {cartItems.length === 0 ? (
        <Container className="center">
          <div>
            <img
              className="mx-auto d-block pb-2"
              src="../../images/logo2.png"
              alt="logo"
              width="66px"
            />
            <h3>Your cart is Empty</h3>
          </div>
        </Container>
      ) : (
        <Container>
          <h1 className="h3 mb-3 fw-normal mt-4">Your Cart</h1>
          <hr className="mt-3" />

          {cartItems.map((item) => (
            <Row
              className="d-flex justify-content-between align-items-center"
              key={item.product}
            >
              <Col md={6} className="d-flex">
                <div className="">
                  <img
                    className="rounded-3"
                    src={item.image}
                    alt={item.name}
                    height=""
                    width="194"
                  />
                </div>
                <div className="align-self-center p-3">
                  <h6 className="">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </h6>
                  <h6
                    className="text-muted text-black mb-0"
                    style={{ fontSize: ".75rem" }}
                  >
                    Unit price: ${item.price.toFixed(2)}
                  </h6>
                </div>
              </Col>

              <Col md={6}>
                <div>
                  <Stack
                    direction="horizontal"
                    className="d-flex justify-content-md-end justify-content-sm-between"
                  >
                    <Col className="col-4 col-lg-3 d-flex flex-row">
                      <span
                        className="btn btn-light minus"
                        onClick={() => decreaseQty(item.product, item.quantity)}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-control count text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <span
                        className="btn btn-light plus"
                        onClick={() =>
                          increaseQty(item.product, item.quantity, item.stock)
                        }
                      >
                        +
                      </span>
                    </Col>
                    <Col className="col-5 col-md-1"></Col>
                    <span className="" style={{ color: "#0D6EFD" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Col className="col-1"></Col>
                    <div className="">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash"
                        onClick={() => removeCartItemHandler(item.product)}
                      ></i>
                    </div>
                  </Stack>
                </div>
              </Col>

              <hr className="mt-3" />
            </Row>
          ))}

          <Row className="text-end mb-4 justify-content-end">
            <p>
              {" "}
              Items Price:{" "}
              <span>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </p>

            <hr />
            <Col md="2" lg="2" xl="2">
              <Button
                id="checkout_btn"
                className="btn btn-lg"
                onClick={checkoutHandler}
              >
                Check out
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Cart;
