import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image, Figure } from "react-bootstrap";
import "../App.css";
import { logout } from "../actions/userActions";
import logo from "../assets/logo.png";
const Appbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-light bg-white sticky-top"
      style={{ height: "60px" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="logo"
            className="object-contain mb-2"
            style={{ width: "40px", height: "auto" }}
          />
          <h2
            className="text-danger justify-content-start fw-bolder mt-1"
            style={{ display: "inline-block", marginLeft: "10px" }}
          >
            <span>DS Creation</span>
          </h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end mr-4"
        >
          <Nav>
            <Link to="/" className="nav-link text-danger fw-bold">
              Home
            </Link>
            <Link to="/programs" className="nav-link text-danger fw-bold">
              Shop
            </Link>
            <Link to="/about" className="nav-link text-danger fw-bold">
              About
            </Link>
            {isAuthenticated ? (
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  variant="default text-dark mx-3"
                  id="dropdown-basic"
                  style={{
                    paddingRight: "5px",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Figure
                    className="avatar-nav"
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "0",
                    }}
                  >
                    <Image
                      width="30"
                      height="30"
                      alt="user avatar"
                      src={user.avatar ?? "./images/avatar.jpg"}
                    />
                  </Figure>
                  <span style={{ paddingRight: "10px" }}>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="bg-light"
                  style={{ paddingRight: "5px" }}
                >
                  {user.role === "admin" && (
                    <Dropdown.Item
                      className="text-dark"
                      onClick={() => navigate("/admin/dashboard")}
                      style={{ backgroundColor: "transparent" }}
                    >
                      Dashboard
                    </Dropdown.Item>
                  )}
                  {user.role !== "admin" && (
                    <Dropdown.Item
                      className="text-dark"
                      onClick={() => navigate("/myprofile")}
                      style={{ backgroundColor: "transparent" }}
                    >
                      Profile
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    className="text-dark"
                    onClick={logoutHandler}
                    style={{ backgroundColor: "transparent" }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="nav-link text-danger fw-bold">
                Login
              </Link>
            )}
            <Link to="/cart" className="text-decoration-none">
              <span id="cart" className="nav-link text-danger fw-bold">
                Cart <FaShoppingCart />
              </span>
            </Link>
            {cartItems.length > 0 && (
              <span
                className="nav-link text-danger fw-bold"
                id="cart_count"
                style={{ fontSize: "0.75rem", margin: "10px" }}
              >
                {cartItems.length}
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
