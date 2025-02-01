import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Appbar from "../components/Appbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { getProducts } from "../actions/productActions";
import MetaData from "../components/layouts/MetaData";
import ImageGrid from "./ImageGrid";
import { Container } from "react-bootstrap";
import VideoGrid from "../components/VideoGrid";
import PremiumPackages from "./PremiumPackages";
import PickoftheWeek from "../components/PickoftheWeek";
import Photographers from "./photographers";
// import Gallery from "../components/Gallery";

function Home() {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Fragment>
      <MetaData title={"Home"} />
      <Appbar />
      <Banner />
      <VideoGrid />
      <Container fluid className="px-0">
        <ImageGrid />
      </Container>
      <PickoftheWeek />
      {/* <Gallery /> */}

      <PremiumPackages />
      <Photographers />

      <Footer />
    </Fragment>
  );
}

export default Home;
