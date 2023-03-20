import React from "react";
import MetaData from "./layout/MetaData";
import { Container } from "react-bootstrap";

function About() {
  return (
    <section id="" className="">
      <MetaData title={"About"} />

      <Container className="py-lg-5 mt-3 px-lg-5 row d-flex justify-content-center mx-auto">
        <div className="col-10 col-lg-6">
          <img
            className="rounded-3 img-fluid"
            src="../../images/about_logo.png"
            alt=""
          />
        </div>
        <div className="col-10 col-lg-6 mt-3 mt-lg-0">
          <h1>About</h1>
          <p>
            Welcome to boolean-balloons online store, where we specialize in
            selling high-quality balloons for all occasions!
          </p>

          <p>
            Our passion for balloons started with a simple idea: to bring joy
            and excitement to people's lives through the simple and timeless joy
            of a balloon. With our extensive selection of balloons, we have
            everything you need to create unforgettable memories at your next
            event, whether it's a birthday party, wedding, graduation, or any
            other special occasion.
          </p>

          {/* <p>
          At our store, we pride ourselves on providing the highest quality
          balloons at the most affordable prices. We understand that our
          customers have a variety of needs and preferences, which is why we
          offer a wide range of balloon types, colors, shapes, and sizes to
          choose from.
        </p> */}

          {/* <p>
          We believe that everyone deserves to celebrate their special moments
          in a way that's both fun and responsible. That's why we are committed
          to using eco-friendly materials in our balloon products wherever
          possible.
        </p> */}

          <p>
            We invite you to browse our online store and discover the joy of
            balloons for yourself. Thank you for choosing us as your go-to
            source for all your balloon needs!
          </p>
        </div>
      </Container>
    </section>
  );
}

export default About;
