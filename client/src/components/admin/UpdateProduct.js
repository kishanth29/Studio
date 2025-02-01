import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { Alert, Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Wedding",
    "Puberty",
    "Birthday",
    "ModelShoot",
    "Graduation",
    "Events",
    "DigitalPainting",
  ];

  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      dispatch(clearProductUpdated());
      setImages([]);
      setImagesPreview([]);
      return;
    }

    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      dispatch(clearError());
      return;
    }

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      setImagesPreview(product.images.map((img) => img.image));
    }
  }, [product]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            {showSuccess && (
              <Alert variant="success">Product Updated Successfully!</Alert>
            )}
            {showError && <Alert variant="danger">{error}</Alert>}
            <form
              onSubmit={submitHandler}
              className="shadow-lg p-4"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="number"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                  required
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Days</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                  required
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.length > 0 && (
                  <span
                    className="mr-2"
                    onClick={clearImagesHandler}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="">
                      {" "}
                      <MdDelete />{" "}
                    </i>
                  </span>
                )}

                <div className="image-previews mt-3">
                  {imagesPreview.map((image, index) => (
                    <img
                      className="mt-3 mr-2"
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      width="100"
                      height="100"
                    />
                  ))}
                </div>
              </div>

              <button
                id="submit_button"
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block py-3"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
