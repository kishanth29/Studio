import { Fragment, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import Appbar from "../Appbar";
import MetaData from "../layouts/MetaData";
import Footer from "../Footer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key_here");

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      alert(orderError);
      return;
    }
  }, [shippingInfo, navigate, dispatch, orderError]);

  if (!orderInfo) {
    return <div>Loading...</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(orderCompleted());
      alert("Payment Successful");

      // Navigate to the success page
      navigate("/order/success");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("There was an error processing your payment.");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <Appbar />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <Container fluid className="py-5 gradient-custom">
          <Row className="d-flex justify-content-center py-5">
            <Col md="7" lg="5" xl="4">
              <Card
                style={{ borderRadius: "15px", backgroundColor: "transparent" }}
              >
                <Card.Body
                  className="p-4"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "15px",
                  }}
                >
                  <h1 className="mb-4 text-white">Card Info</h1>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="cardElement" className="mb-3">
                      <Form.Label className="text-white">
                        Card Details
                      </Form.Label>
                      <CardElement
                        className="form-control"
                        options={{ hidePostalCode: true }}
                      />
                    </Form.Group>
                    <Button
                      id="pay_btn"
                      type="submit"
                      className="btn bg-danger py-3"
                      disabled={!stripe}
                    >
                      Pay - {` Rs.${orderInfo.totalPrice}`}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
}
