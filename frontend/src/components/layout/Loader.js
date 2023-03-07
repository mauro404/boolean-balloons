import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="center flex-column">
      <div className="flex-row">
        <img
          className="mb-4"
          src="../../images/logo2.png"
          alt="logo"
          width="66px"
        />
        Loading...
      </div>
      <div className="pt-5">
        <Spinner animation="border" role="status" className="text-primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Container>
  );
};

export default Loader;
