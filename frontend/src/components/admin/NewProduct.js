import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import{ toast } from 'react-toastify'
import MetaData from '../layout/MetaData'
import AdminNav from './AdminNav'
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap'

const NewProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/products');
            toast.success('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('stock', stock);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Container className="px-2 px-md-0 px-lg-5">
            <MetaData title={'New Product'} />
            <AdminNav />

            <Form className="" onSubmit={submitHandler} encType='multipart/form-data'>
              <h3 className="py-4">Add New Product</h3>

              <Form.Group>
                <FloatingLabel
                label="Name"
                className="mb-3"
                >
                <Form.Control
                    required
                    type="text"
                    className="form-control mb-3"
                    id="name_field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                label="Price"
                className="mb-3"
                >
                <Form.Control
                    required
                    type="text"
                    className="form-control mb-3"
                    id="price_field"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                label="Description"
                className="mb-3"
                >
                <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    className="form-control mb-3"
                    id="description_field"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                label="Stock"
                className="mb-3"
                >
                <Form.Control
                    required
                    type="number"
                    className="form-control mb-3"
                    id="stock_field"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                label="Images"
                className="mb-3 pt-2"
                >
                <Form.Control
                    required
                    type="file"
                    className="form-control custom-file-input"
                    id="customFile"
                    onChange={onChange}
                    multiple
                  />
                </FloatingLabel>
              </Form.Group>
              <Container>
                {imagesPreview.map(img => (
                  <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" />
                ))}
              </Container>
              <Button
                id="login_button"
                type="submit"
                className="btn btn-block mb-3"
                disabled={loading ? true : false}
                >
                Create Product
              </Button>
            </Form>
        </Container>
    )
}

export default NewProduct
