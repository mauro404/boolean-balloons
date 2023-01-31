import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const Product = ({ product }) => {
    return (
        <Col key={product._id} style={{paddingBottom: "3%"}}>
                <Card className="productCard">
                  <Card.Img variant="top" src={product.images[0].url} alt={product.name}/>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>$ {product.price}.00</Card.Text>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><Button variant="primary" href={`/product/${product._id}`}>More Details</Button></Card.Text>
                    {/* <Card.Text><Card.Link className="text-decoration-none" href={`/products/${product._id}`}>More details</Card.Link></Card.Text> */}
                  </Card.Body>
                </Card>
        </Col>
    )
}

export default Product
