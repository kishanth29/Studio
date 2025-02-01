import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import video from "../assets/videos/home.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  const bannerStyles = {
    container: {
      padding: 0,
      margin: 0,
    },
    videoContainer: {
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      margin: 0,
      padding: 0,
    },
    videoOverlay: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      color: "white",
      textAlign: "right",
      background: "rgba(0, 0, 0, 0.5)",
      padding: "20px",
      boxSizing: "border-box",
      zIndex: 1,
    },
    videoText: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    videoParagraph: {
      fontSize: "1.5rem",
    },
    videoFluid: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    carouselImage: {
      height: "100vh",
      objectFit: "cover",
    },
  };

  return (
    <Container fluid style={bannerStyles.container}>
      <Row className="g-0 w-100">
        <Col lg={12}>
          <Carousel>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src={require("../assets/shan.jpg")}
                alt="First slide"
                style={bannerStyles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Capture the World</h3>
                <p className="d-none d-sm-block">Explore breathtaking views</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src={require("../assets/three.jpg")}
                alt="Second slide"
                style={bannerStyles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Moments that Matter</h3>
                <p>Preserve your special moments forever</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src={require("../assets/two.jpg")}
                alt="Third slide"
                style={bannerStyles.carouselImage}
              />
              <Carousel.Caption>
                <h3>Art in Every Shot</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="g-0 w-100">
        <Col lg={12} style={bannerStyles.videoContainer}>
          <video autoPlay loop muted style={bannerStyles.videoFluid}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={bannerStyles.videoOverlay}>
            <h1 style={bannerStyles.videoText}>
              <b>
                Discover the Art <br />
                of Photography
              </b>
            </h1>
            <p style={bannerStyles.videoParagraph}>
              Explore the beauty through the lens,
              <br />
              master the art of capturing moments,
              <br />
              and unleash your creativity.
            </p>
            <p>
              <Button variant="danger" as={Link} to="/login">
                Log in
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
