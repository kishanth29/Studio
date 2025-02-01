import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../Appbar";
import Footer from "../Footer";
import video from "../../assets/videos/login.mp4";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [backendError, setBackendError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isAuthenticated } = useSelector((state) => state.authState);
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setBackendError("");

    if (validateForm()) {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      if (error.includes("Invalid credentials")) {
        setBackendError("Invalid email or password. Please try again.");
      } else {
        setBackendError("An error occurred. Please try again later.");
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <Appbar />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <video
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Row className="w-100">
            <Col lg={5} className="mx-auto">
              <div
                className="shadow-lg p-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "10px",
                }}
              >
                <h1 className="mb-3 text-center">Login</h1>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="email_field" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      className={emailError ? "is-invalid" : ""}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password_field" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className={passwordError ? "is-invalid" : ""}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <div className="invalid-feedback">{passwordError}</div>
                    )}
                  </Form.Group>
                  {backendError && (
                    <Alert variant="danger">{backendError}</Alert>
                  )}
                  <div className="d-flex justify-content-between mb-3">
                    <Link to="/password/forgot" className="small">
                      Forgot Password?
                    </Link>
                    <Link to="/register" className="small">
                      New User?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2"
                  >
                    LOGIN
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer className="footer-custom" />
    </Fragment>
  );
};

export default Login;
