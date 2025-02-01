import React from "react";
import videoSources from "./video"; // Adjust the path as needed
import "bootstrap/dist/css/bootstrap.min.css";

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

const VideoGrid = () => {
  return (
    <div className="container mt-4">
      <h3 style={headingStyle}>Recent Shorts</h3>
      <div className="row">
        {videoSources.map((source) => (
          <div key={source.id} className="col-md-3 mb-4">
            <div
              className="position-relative overflow-hidden"
              style={{
                borderRadius: "8px", // Optional: adds rounded corners
              }}
            >
              <video
                autoPlay
                loop
                muted
                className="w-100 h-100 transform-scale"
                style={{
                  transition: "transform 0.3s ease-in-out",
                  objectFit: "cover", // Ensures the video covers the space of the container
                }}
              >
                <source src={source.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="position-absolute w-100 h-80 border border-white"
                style={{
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
