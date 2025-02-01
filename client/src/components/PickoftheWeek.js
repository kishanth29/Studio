import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const PickoftheWeek = () => {
  const [show, setShow] = useState(false);
  return (
    <section id="programs" className="my-3">
      <div className="text-center my-2 py-3">
        <h2 className="display-5 text-secondary">
          <i className="bi bi-search-heart"></i>Pick of the week
        </h2>
      </div>
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <Image
              src={require("../assets/five.jpg")}
              fluid={true}
              alt="family"
              rounded
            ></Image>
          </Col>

          <Col md={5}>
            <div className="p-3">
              <h2 className="h1">Best click of the week</h2>
              <h2 className="h1">Photo of the Week</h2>
              <p className="lead text-muted">
                Capturing moments that tell a story, one frame at a time.
              </p>
            </div>
          </Col>
        </Row>

        <ToastContainer
          className="position-fixed bottom-0 end-0 p-3"
          position={"bottom-end"}
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Added!</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>item added to card</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </section>
  );
};

export default PickoftheWeek;
