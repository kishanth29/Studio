import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import sandi from "../../assets/Home/sandi.jpg";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const { completedOrders = [] } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        totalAmount += item.price * (item.quantity || 1);
      });
    });
    return totalAmount.toFixed(2); // Format to 2 decimal places
  };

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-2" style={{ justifyContent: "center" }}>
            <div
              className="col-xl-12 col-sm-12 mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px 0 0 10px",
              }}
            >
              <div
                className="card text-black o-hidden h-100"
                style={{
                  width: "50%",
                  borderLeft: "15px solid orange",
                  borderRadius: "10px",
                }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    <b>Total Amount</b> <br /> <b>Rs{calculateTotalAmount()}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row pr-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="col-xl-3 col-sm-6 mb-3"
              style={{ flex: "1", margin: "0 10px" }}
            >
              <div
                className="card text-black o-hidden h-100"
                style={{ borderLeft: "15px solid green", borderRadius: "10px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    {" "}
                    <b>Products</b> <br /> <b>{products.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-black clearfix small z-1 text-decoration-none"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="col-xl-3 col-sm-6 mb-3"
              style={{ flex: "1", margin: "0 10px" }}
            >
              <div
                className="card text-black o-hidden h-100"
                style={{ borderLeft: "15px solid red", borderRadius: "10px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    {" "}
                    <b>Orders</b>
                    <br /> <b>{completedOrders.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-black clearfix small z-1 text-decoration-none"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="col-xl-3 col-sm-6 mb-3"
              style={{ flex: "1", margin: "0 10px" }}
            >
              <div
                className="card text-black o-hidden h-100"
                style={{ borderLeft: "15px solid blue", borderRadius: "10px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    {" "}
                    <b>Users</b>
                    <br /> <b>{users.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-black clearfix small z-1 text-decoration-none"
                  to="/admin/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="justify-content-center align-items-center d-flex">
            <Image
              src={sandi}
              alt=""
              fluid
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
