import React from "react";
import images from "./image";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const headingStyle = {
  backgroundColor: "red",
  color: "white",
  textAlign: "center",
  padding: "15px 20px",
  textTransform: "uppercase",
  fontSize: "1.5rem",
  maxWidth: "fit-content",
  marginTop: "30px",
  marginBottom: "30px",
  marginLeft: "auto",
  marginRight: "auto",
  transform: "rotate(-9deg)",
};

// Custom styles for the image to ensure consistent size and aspect ratio
const imageStyle = {
  height: "200px", // Fixed height for all images
  width: "100%", // Full width of the container
  objectFit: "cover", // Ensures the image fits without distortion
};

const Photographers = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={headingStyle}>
        Our Photographers
      </h1>
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100 w-100">
              {/* Apply custom styles to ensure consistent image size */}
              <img
                src={image.src}
                alt={image.alt}
                className="card-img-top"
                style={imageStyle}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{image.name}</h5>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="text-primary">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-success">
                    <FaWhatsapp size={24} />
                  </a>
                  <a href="#" className="text-danger">
                    <FaInstagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photographers;
