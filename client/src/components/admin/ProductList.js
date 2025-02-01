import { Fragment, useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(null);

  const setProducts = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `Rs${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/products/${product._id}`}
              className="btn btn-info"
            >
              <FaEdit />
            </Link>
            <Link
              onClick={(e) => deleteHandler(e, product._id)}
              className="btn btn-danger ms-2"
            >
              <MdDelete />
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      setAlert({ type: "danger", message: error || productError });
      dispatch(clearError());
      return;
    }
    if (isProductDeleted) {
      setAlert({ type: "success", message: "Product Deleted Successfully!" });
      dispatch(clearProductDeleted());
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Product List</h1>
        {alert && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert(null)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
