import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PremiumPackages() {
  const packages = [
    {
      name: "Wedding Package",
      price: "Rs75,000",
      features: [
        "Full-day coverage",
        "100 edited photos",
        "Photo album",
        "Online gallery",
      ],
      description:
        "Capture every moment of your special day with our comprehensive wedding photography package.",
      buttonLabel: "Choose Wedding",
    },
    {
      name: "Puberty Package",
      price: "Rs45,000",
      features: [
        "3-hour session",
        "50 edited photos",
        "Traditional photo album",
        "Online gallery",
      ],
      description:
        "Celebrate this important milestone with a tailored photography session.",
      buttonLabel: "Choose Puberty",
    },
    {
      name: "Birthday Package",
      price: "Rs30,000",
      features: ["2-hour session", "25 edited photos", "Online gallery"],
      description:
        "Make your birthday unforgettable with a fun and vibrant photography session.",
      buttonLabel: "Choose Birthday",
    },
    {
      name: "Model Package",
      price: "Rs60,000",
      features: [
        "4-hour session",
        "50 edited photos",
        "Portfolio album",
        "Online gallery",
      ],
      description:
        "Perfect for aspiring models looking to create or update their portfolio.",
      buttonLabel: "Choose Model",
    },
    {
      name: "Graduation Package",
      price: "Rs35,000",
      features: [
        "2-hour session",
        "30 edited photos",
        "Graduation photo album",
        "Online gallery",
      ],
      description:
        "Celebrate your academic achievements with a special graduation photography session.",
      buttonLabel: "Choose Graduation",
    },
    // {
    //   name: "Events Package",
    //   price: "Rs90,000",
    //   features: ["Full-day coverage", "150 edited photos", "Online gallery"],
    //   description:
    //     "Professional photography for your corporate events, conferences, and other gatherings.",
    //   buttonLabel: "Choose Events",
    // },
    {
      name: "Digital Painting Package",
      price: "Rs25,000",
      features: [
        "Custom digital portrait",
        "High-resolution file",
        "Print-ready",
      ],
      description:
        "Transform your photos into stunning digital paintings with our artistic service.",
      buttonLabel: "Choose Digital Painting",
    },
  ];

  return (
    <Container
      className="my-5"
      style={{
        backgroundColor: "",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 className="text-center mb-4 text-red">Our Premium Packages</h2>
      <Row>
        {packages.map((pkg, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">{pkg.name}</Card.Title>
                <Card.Subtitle className="text-center mb-3 text-muted">
                  {pkg.price}
                </Card.Subtitle>
                <Card.Text>{pkg.description}</Card.Text>
                <ul className="list-unstyled">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>&#10003; {feature}</li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="danger" className="w-100 ">
                  <Link
                    to={`/programs`}
                    className=" text-bg-danger text-decoration-none"
                  >
                    {pkg.buttonLabel}
                  </Link>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
