import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import Product from "../components/layouts/product/Product";
import { getProducts } from "../actions/productActions";
import video from "../assets/videos/b1.mp4";
import MetaData from "../components/layouts/MetaData";

export default function Programs() {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector(
    (state) => state.productsState
  );
  const [currentPage] = useState(1);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  // Ensuring no errors are thrown if products is empty
  const categories = {};

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  const styles = {
    videoContainer: {
      position: "relative",
      width: "100%",
      height: "auto",
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
      background: "rgba(0, 0, 0, 0) ",
      padding: "20px",
      boxSizing: "border-box",
      zIndex: 1,
    },
    video: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
    },
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
    <Fragment>
      <MetaData title={"Programs"} />
      <Appbar />
      <div style={styles.videoContainer}>
        <video autoPlay loop muted style={styles.video}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{ ...styles.videoOverlay, fontFamily: "Arial, sans-serif" }}
        >
          <h1 style={{ fontSize: "2rem" }}>Capture Stunning Moments</h1>
          <p style={{ fontSize: "1rem" }}>
            Explore a wide range of photography tips, <br /> breathtaking
            galleries, and expert advice <br /> to enhance your skills and
            creativity.
          </p>
        </div>
      </div>
      {Object.entries(categories).map(([category, items]) => (
        <Fragment key={category}>
          <h1
            id={category}
            className="container mt-5 text-danger text-center text-white"
            style={headingStyle}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <section className="container mt-5">
            <div className="row">
              {items.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </section>
        </Fragment>
      ))}
      <Footer />
    </Fragment>
  );
}
