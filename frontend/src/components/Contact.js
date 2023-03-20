import React from "react";
import MetaData from "./layout/MetaData";
import { Form, FloatingLabel, Button, Container } from "react-bootstrap";

function Contact() {
  return (
    <section>
      <MetaData title={"Contact"} />
      <Container className="col-lg-4 col-md-6 text-center my-5">
        <img
          className="mb-2"
          src="../../images/logo2.png"
          alt="logo"
          width="66px"
        />
        <h1 className="mb-3">Contact Us</h1>
        <p className="mb-3">
          Our team is dedicated to providing excellent customer service, and we
          are always available to answer any questions you may have about our
          products or services.
        </p>

        <Form.Group>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              required
              type="name"
              className="form-control mb-3"
              id="floatingInput"
              name="name"
              // value={name}
              // onChange={onChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Email Address" className="mb-3">
            <Form.Control
              required
              type="email"
              className="form-control mb-3"
              id="floatingInput"
              name="email"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Subject" className="mb-3">
            <Form.Control
              required
              type="name"
              className="form-control mb-3"
              id="floatingInput"
              name="name"
              // value={name}
              // onChange={onChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel label="Message" className="mb-3">
            <Form.Control
              required
              as="textarea"
              height="6rem"
              type="name"
              className="form-control mb-3"
              id="floatingInput"
              name="name"
              // value={name}
              // onChange={onChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Button className="mb-3 btn-lg w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </section>
  );
}

export default Contact;
