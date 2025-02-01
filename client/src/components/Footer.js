import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaGem,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
} from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

const Footer = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    // Create FormData object from the form
    const formData = new FormData(event.target);

    // Append additional fields
    formData.append("access_key", "8d8f3462-ce60-4b78-a568-2159755c1495");
    formData.append(
      "welcome_message",
      "Welcome to Inner Peace Portal, we will contact you within 24 hours"
    );

    try {
      // Send the form data to the API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      const data = await response.json();

      if (data.success) {
        setResult("Email sent successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred while sending the email");
    }
  };

  return (
    <footer className="text-center text-lg-start bg-white text-danger mt-0">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>
            <strong>Get connected with us on social networks:</strong>
          </span>
        </div>
        <div>
          <a
            href="https://www.facebook.com/share/15UAi1en5i/?mibextid=wwXIfr"
            className="me-4 text-reset text-danger"
            aria-label="Facebook"
            target="_blank"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/ds_creations_studio"
            className="me-4 text-reset text-danger"
            aria-label="Instagram"
            target="_blank"
          >
            <FaInstagram />
          </a>
          <a
            href="/"
            className="me-4 text-reset text-danger"
            aria-label="LinkedIn"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>

      <Form onSubmit={onSubmit} className="bg-white text-danger p-4">
        <Row className="d-flex justify-content-center">
          <Col size="auto">
            <p className="pt-2 px-4">
              <strong>Sign up for our newsletter</strong>
            </p>
          </Col>
          <Col md={5} lg={3}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="d-none">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email address"
                className="mt-2"
                size="sm"
                required
              />
            </Form.Group>
          </Col>
          <Col size="auto" md={5} lg={3}>
            <Button
              variant="outline-danger"
              type="submit"
              className="mt-2"
              size="sm"
            >
              Subscribe
            </Button>
          </Col>
        </Row>
        <div className="mt-3 text-center">
          <span>{result}</span>
        </div>
      </Form>

      <section className="">
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <div className="d-flex justify-content-center mb-4">
                <FaCamera size={60} />
              </div>

              <h6 className="text-uppercase fw-bold mb-4 text-center">
                DS Creation
              </h6>
              <div className="d-flex justify-content-center mb-4">
                <FaGem size={60} />
              </div>
            </Col>

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Programs</h6>
              <p>
                <a
                  href="/"
                  className="text-reset text-danger text-decoration-none"
                >
                  Wedding
                </a>
              </p>
              <p>
                <a
                  href="/"
                  className="text-reset text-danger text-decoration-none"
                >
                  Birthday
                </a>
              </p>
              <p>
                <a
                  href="/"
                  className="text-reset text-danger text-decoration-none"
                >
                  Graduation
                </a>
              </p>
              <p>
                <a
                  href="/"
                  className="text-reset text-danger text-decoration-none"
                >
                  Events
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FaHome className="me-2" />
                No 133, Thunukkai Road, Mankulam
              </p>
              <p>
                <FaEnvelope className="me-3" />
                studiods401@gmail.com
              </p>
              <p>
                <FaPhone className="me-3" /> +94 76 661 2779
              </p>
              <p>
                <FaPrint className="me-3" /> +94 76 661 2779
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="text-center p-4 bg-white">
        © 2025 Copyright:
        <a
          className="text-reset fw-bold text-danger text-decoration-none"
          href="/"
        >
          @ DS Creation
        </a>
      </div>
    </footer>
  );
};

export default Footer;
