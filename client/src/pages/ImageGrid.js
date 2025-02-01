import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import images from "../assets/images/imageData";

export default function ImageGrid() {
  // Split images array into chunks of 4
  const chunkedImages = [];
  for (let i = 0; i < images.length; i += 4) {
    chunkedImages.push(images.slice(i, i + 4));
  }

  // Define inline styles
  const imageStyle = {
    width: "100%",
    height: "400px", // Set a fixed height
    objectFit: "cover", // Maintain aspect ratio and cover the area
  };

  const headingStyle = {
    backgroundColor: "red", // Red background color
    color: "white",
    textAlign: "center",
    padding: "15px 20px",
    textTransform: "uppercase",
    fontSize: "1.5rem", // Default for small screens
    maxWidth: "fit-content",
    marginTop: "30px", // Add top margin
    marginBottom: "30px", // Add bottom margin
    marginLeft: "auto", // Center alignment
    marginRight: "auto", // Center alignment
    transform: "rotate(-9deg)", // Add rotation effect
  };

  return (
    <Container fluid className="px-0">
      {/* Common Heading */}
      <h3 style={headingStyle}>Recent Works</h3>

      {/* Image Grid */}
      {chunkedImages.map((rowImages, rowIndex) => (
        <Row key={rowIndex} className="g-0">
          {rowImages.map((image) => (
            <Col key={image.id} md={3} className="position-relative">
              <img src={image.src} alt={image.alt} style={imageStyle} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
