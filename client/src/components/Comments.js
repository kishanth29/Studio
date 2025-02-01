import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const Comments = () => {
  return (
    <section className="bg-light">
      <div className="text-center my-2 py-3">
        <h2 className="display-5 text-secondary">
          comment <i class="bi bi-chat-heart"></i>
        </h2>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                <i class="bi bi-person-circle"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                <i class="bi bi-envelope-at-fill"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Comments</label>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Comments;
