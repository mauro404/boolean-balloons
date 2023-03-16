import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <section id="about" className="">
      <Container className="py-5 fw-semibold h-100 w-75 text-center">
        <div className="">
        <h1 className="py-lg-5 text-center">
            About
        </h1>
        <p>
          Welcome to boolean-balloons online store, where we specialize in
          selling high-quality balloons for all occasions!
        </p>

        <p>
          Our passion for balloons started with a simple idea: to bring joy and
          excitement to people's lives through the simple and timeless joy of a
          balloon. With our extensive selection of balloons, we have everything
          you need to create unforgettable memories at your next event, whether
          it's a birthday party, wedding, graduation, or any other special
          occasion.
        </p>

        <p>
          At our store, we pride ourselves on providing the highest quality
          balloons at the most affordable prices. We understand that our
          customers have a variety of needs and preferences, which is why we
          offer a wide range of balloon types, colors, shapes, and sizes to
          choose from.
        </p>

        <p>
          We believe that everyone deserves to celebrate their special moments
          in a way that's both fun and responsible. That's why we are committed
          to using eco-friendly materials in our balloon products wherever
          possible.
        </p>

        <p>
          Our team is dedicated to providing excellent customer service, and we
          are always available to answer any questions you may have about our
          products or services.
        </p>

        <p>
          We invite you to browse our online store and discover the joy of
          balloons for yourself. Thank you for choosing us as your go-to source
          for all your balloon needs!
        </p>
        </div>
      </Container>
    </section>
  );
}

export default About;
