import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import backgroundImage from "../../assets/card.jpg";
import Appbar from "../../components/Appbar";
import Footer from "../../components/Footer";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [navigate, shippingInfo]);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <Appbar />
      <div
        className="row justify-content-around mt-0 text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <CheckoutSteps shipping confirmOrder />
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
              {shippingInfo.postalCode}, {shippingInfo.state},{" "}
              {shippingInfo.country}{" "}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <Fragment>
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-decoration-none text-danger"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x Rs{item.price} ={" "}
                        <b>Rs{item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">Rs{itemsPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">Rs{shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">Rs{taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">Rs{totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={processPayment}
                className="btn bg-danger btn-block"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}
