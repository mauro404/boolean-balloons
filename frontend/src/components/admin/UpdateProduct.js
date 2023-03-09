import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import AdminNav from "./AdminNav";
import { Form, FloatingLabel, Button, Container } from "react-bootstrap";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Container className="px-2 px-md-0 px-lg-5">
      <MetaData title={"Update Product"} />
      <AdminNav />

      <Form className="" onSubmit={submitHandler} encType="multipart/form-data">
        <h3 className="py-4">Update Product</h3>

        <Form.Group>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              required
              type="text"
              id="name_field"
              className="form-control mb-3"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Price" className="mb-3">
            <Form.Control
              required
              type="text"
              id="price_field"
              className="form-control mb-3"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Description" className="mb-3">
            <Form.Control
              required
              type="textarea"
              id="description_field"
              className="form-control mb-3"
              rows="8"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Stock" className="mb-3">
            <Form.Control
              required
              type="number"
              id="stock_field"
              className="form-control mb-3"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Images" className="mb-3 pt-2">
            <Form.Control
              required
              type="file"
              name="product_images"
              className="form-control custom-file-input"
              id="customFile"
              onChange={onChange}
              multiple
            />

            {oldImages &&
              oldImages.map((img) => (
                <img
                  key={img}
                  src={img.url}
                  alt={img.url}
                  className="mt-3 mr-2"
                  width="55"
                />
              ))}

            {imagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                className="mt-3 mr-2"
                width="55"
              />
            ))}
          </FloatingLabel>
        </Form.Group>

        <Button
          id="login_button"
          type="submit"
          className="btn btn-block mb-3"
          disabled={loading ? true : false}
        >
          UPDATE
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
