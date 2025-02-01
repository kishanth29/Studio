import { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

export default function UserOrders() {
  // Select completed orders from the Redux state
  const { completedOrders = [] } = useSelector((state) => state.cartState);

  // Function to format data for MDBDataTable
  const setOrders = () => {
    const data = {
      columns: [
        { label: "Order ID", field: "id", sort: "asc" },
        { label: "Product Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Days", field: "days", sort: "asc" },
        { label: "Total Amount", field: "totalAmount", sort: "asc" },
        { label: "Order Date", field: "orderDate", sort: "asc" },
      ],
      rows: [],
    };

    completedOrders.forEach((order, index) => {
      order.items.forEach((item) => {
        data.rows.push({
          id: `${index}-${item.product}`,
          name: item.name || "N/A",
          price: `Rs.${item.price || 0}`,
          days: item.quantity || 0,
          totalAmount: `Rs.${item.price * (item.quantity || 1) || 0}`,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          actions: (
            <Link to={`/order/${item.product}`} className="btn btn-primary">
              <i className="bi bi-eye"></i>
            </Link>
          ),
        });
      });
    });

    return data;
  };

  // Calculate the total amount of all orders
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        totalAmount += item.price * (item.quantity || 1);
      });
    });
    return totalAmount.toFixed(2); // Format to 2 decimal places
  };

  return (
    <Fragment>
      <MetaData title="My Orders" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <h1 className="my-4">My Orders</h1>

            {/* Display Total Amount */}
            <div className="mb-4">
              <h4>Total Amount of All Orders: Rs. {calculateTotalAmount()}</h4>
            </div>

            <MDBDataTable
              bordered
              striped
              hover
              data={setOrders()}
              className="px-3"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
