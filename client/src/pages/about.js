import React from "react";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import PersonalProfile from "./profile";
import ContactForm from "../components/ContactForm";
import backgroundImage from "../assets/about.jpg"; // Update with a relevant image
import { FaCamera, FaImages, FaPhotoVideo } from "react-icons/fa";
import MetaData from "../components/layouts/MetaData";
import { Card, Container, Row, Col } from "react-bootstrap";

// Inline CSS for wave animation
const waveAnimation = `
@keyframes wave {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
`;

const waveStyle = {
  display: "inline-block",
  animation: "wave 1s ease-in-out infinite",
};

const evenWaveStyle = {
  ...waveStyle,
  animationDelay: "0.1s",
};

// Component with updated layout
export default function About() {
  return (
    <>
      <MetaData title={"About Page"} />
      <Appbar />

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          position: "relative",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <div
          style={{
            textAlign: "right",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "50%",
            color: "white",
          }}
        >
          <p style={{ margin: 0 }}>ABOUT OUR DS CREATION</p>
          <h4 style={{ margin: 0 }}>
            Capturing moments, creating stories, <br />
            and preserving memories for a lifetime.
          </h4>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <style>{waveAnimation}</style>
        <div>
          <h1 style={waveStyle}>Created to showcase the art of photography.</h1>{" "}
          <br />
          <span>
            <p style={evenWaveStyle}>
              <b>
                We believe photography is more than just images. <br />
                It's about storytelling, capturing emotions, and sharing unique
                perspectives with the world.
              </b>
            </p>
          </span>
        </div>
      </div>

      <div className="bg-dark text-white">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "200px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0 }} className="text-white">
            Explore the world through our lens
          </h3>
          <p style={{ margin: 0 }}>
            Our platform brings together professionals and enthusiasts, offering
            tips, tutorials, and galleries to inspire creativity.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ flex: 1, padding: "10px", height: "300px" }}>
            <h4>
              <FaCamera size={48} />
            </h4>
            <p>
              Discover the art of photography, <br />
              from beginner tips to advanced techniques, <br />
              for breathtaking shots.
            </p>
          </div>
          <div style={{ flex: 1, padding: "10px", height: "300px" }}>
            <h4>
              <FaImages size={48} />
            </h4>
            <p>
              Build your portfolio with stunning <br />
              visuals and share your journey with <br />a global audience.
            </p>
          </div>
          <div style={{ flex: 1, padding: "10px", height: "300px" }}>
            <h4>
              <FaPhotoVideo size={48} />
            </h4>
            <p>
              Access tutorials and inspiration <br />
              to elevate your photography <br />
              and storytelling.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: "#000", color: "#fff", padding: "50px 0" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                }}
              >
                <Card.Body className="text-center">
                  <Card.Title as="h2">Vision</Card.Title>
                  <Card.Text className="mb-4">
                    To be a leading platform that inspires the world through the
                    art of photography.
                  </Card.Text>
                  <Card.Title as="h2">Mission</Card.Title>
                  <Card.Text>
                    To provide resources, tools, and a community where
                    photographers can thrive.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <PersonalProfile />
      <ContactForm />
      <Footer />
    </>
  );
}
