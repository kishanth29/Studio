import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../../actions/productActions";
import { Carousel, Modal } from "react-bootstrap";
import MetaData from "../MetaData";
import { addCartItem } from "../../../actions/cartActions"; // Ensure this action accepts bookingDate
import {
  clearReviewSubmitted,
  clearError,
  clearProduct,
} from "../../../slices/productSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import ProductReview from "./ProductReview";
import Appbar from "../../Appbar";
import Footer from "../../Footer";

export default function ProductDetail() {
  const {
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber === 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  const bookNowHandler = () => {
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }
    dispatch(addCartItem(product._id, quantity, bookingDate));
    alert("Booking confirmed for " + bookingDate);
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      alert("Review Submitted successfully");
      dispatch(clearReviewSubmitted());
    }
    if (error) {
      alert(error);
      dispatch(clearError());
      return;
    }
    if (!product._id || product._id !== id) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  return (
    <Fragment>
      <Appbar />
      <MetaData title={product.name} />
      <div className="row f-flex justify-content-around mb-5">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <Carousel pause="hover">
            {product.images &&
              product.images.length > 0 &&
              product.images.map((image) => (
                <Carousel.Item key={image._id}>
                  <img
                    className="d-block w-100"
                    src={image.image}
                    alt={product.name}
                    height="500"
                    width="500"
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>

          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          <hr />
          <p id="product_price">Rs {product.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </div>
          <hr />
          <label htmlFor="bookingDate">Select Booking Date:</label>
          <input
            type="date"
            id="bookingDate"
            className="form-control mb-3"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
          <button
            type="button"
            id="cart_btn"
            disabled={product.stock === 0 ? true : false}
            onClick={bookNowHandler}
            className="btn bg-danger d-inline btn-custom"
          >
            Book Now
          </button>
          <hr />
          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product.seller}</strong>
          </p>
          {user ? (
            <button
              onClick={handleShow}
              id="review_btn"
              type="button"
              className="btn bg-danger mt-4 btn-custom"
            >
              Submit Your Review
            </button>
          ) : (
            <div className="alert alert-danger mt-5"> Login to Post Review</div>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Submit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="rate">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseOver={() => setRating(star)}
                    onMouseOut={() => setRating(rating)}
                    className={`star ${star <= rating ? "checked" : ""}`}
                  >
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                name="review"
                id="review"
                className="form-control mt-3"
              ></textarea>
              <button
                onClick={reviewHandler}
                aria-label="Close"
                className="btn my-3 float-right review-btn px-4 text-primary"
              >
                Submit
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 ? (
        <ProductReview reviews={product.reviews} />
      ) : null}
      <Footer />
    </Fragment>
  );
}
