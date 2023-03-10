import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ReviewsList from "./ReviewsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Button, Modal } from "react-bootstrap";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
  yellow: "#FFFF00",
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const params = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    toast.success("Item Added to Cart");
  };
  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  // Star in review & comment
  const stars = Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(undefined);

  const clickHandler = (value) => {
    setRating(value);
  };

  const mouseOver = (hoverColor) => {
    setHover(hoverColor);
  };

  const mouseOut = () => {
    setHover(undefined);
  };

  const submitHandler = () => {
    const fromData = new FormData();

    fromData.set("rating", rating);
    fromData.set("comment", comment);
    fromData.set("productId", params.id);
    fromData.set("name", user.name);

    dispatch(newReview(fromData));

    setShow(false);
  };
  //   const reviewHandler = () => {
  //     const formData = new FormData();

  //     formData.set('rating', rating);
  //     formData.set('comment', comment);
  //     formData.set('productId', params.id);

  //     dispatch(newReview(formData));
  // }

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Review posted successfully')
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, params.id, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row d-flex justify-content-around">
            <div className="col-10 col-lg-5 mt-5 img-fluid" id="product_image">
              <img
                className="d-block w-100 rounded-3"
                src={product.images && product.images[0].url}
                alt={product.title}
              />
            </div>

            <div className="col-10 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>
              <p>{product.description}</p>
              {/* <h5>Specifications</h5>
                            <p>Unit Count: 1</p>
                            <p>Item Dimensions: LxWxH	24 x 24 x 24 inches</p>
                            <p>Material:	Rubber</p>
                            <p>Brand:	boolean balloons</p> */}
              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${(product.price)?.toFixed(2)}</p>
              <div className="stockCounter d-inline" style={{ height: "16px" }}>
                <span className="btn btn-light minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-light plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <br />
              <br />
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              {user ? (
                <div className="btn-review-position">
                  <Link as={Button}
                    type="button"
                    className="btn-review"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={handleShow}
                  >
                    Review Product
                  </Link>
                </div>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className=""
              >
                <Modal.Header closeButton>
                  <Modal.Title>Review Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={style.container}>
                    <div style={style.stars}>
                      {stars.map((_, index) => {
                        return (
                          <FontAwesomeIcon icon={faStar}
                            key={index}
                            size={100}
                            style={{ marginRight: 10, cursor: "pointer" }}
                            onClick={() => clickHandler(index + 1)}
                            onMouseOver={() => mouseOver(index + 1)}
                            color={
                              hover || rating > index
                                ? colors.orange || colors.yellow
                                : colors.grey
                            }
                            onMouseOut={mouseOut}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <textarea
                    name="review"
                    className="form-control mt-3"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btn btn-review" onClick={submitHandler}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <ReviewsList reviews={product.reviews} className=""/>
          ) : (
            <div className="row d-flex justify-content-around">
              <div className="col-lg-11 col-10 mt-5">
                <h4 className="">Reviews:</h4>
                <hr className=""/>
                <p className="review_comment text-muted my-3">There are no reviews.<br/> Be the first to review this product!</p>
                <hr />
              </div>
            </div>
          )}

        </Fragment>
      )}
    </Fragment>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default ProductDetails;
