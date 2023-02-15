import React from 'react'
import { Spinner, Container } from 'react-bootstrap'

const Loader = () => {
  return (
    <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  )
}

export default Loader