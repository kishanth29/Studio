import axios from "axios";
import {
  productsFail,
  productsSuccess,
  productsRequest,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
} from "../slices/productsSlice";
import {
  productFail,
  productSuccess,
  productRequest,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} from "../slices/productSlice";

// export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

//     try {
//         dispatch(productsRequest())
//         let link = `/api/v1/products?page=${2}`;

//         if(keyword) {
//             link += `&keyword=${keyword}`
//         }
//         if(price) {
//             link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
//         }
//         if(category) {
//             link += `&category=${category}`
//         }
//         if(rating) {
//             link += `&ratings=${rating}`
//         }

//         const { data }  =  await axios.get(link);
//         dispatch(productsSuccess(data))
//     } catch (error) {
//         //handle error
//         dispatch(productsFail(error.response.data.message))
//     }

// }

//  get products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch(productsRequest());
    const response = await axios.get("/api/v1/products");

    if (response.data) {
      dispatch(productsSuccess(response.data));
    } else {
      dispatch(productsFail("Received undefined data from server"));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(
      productsFail(error.response?.data?.message || "Failed to fetch products")
    );
  }
};

//  get product
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productRequest });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: productSuccess,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productFail,
      payload: error.response.data.message,
    });
  }
};

//  create review
export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    //handle error
    dispatch(createReviewFail(error.response.data.message));
  }
};

//  Get Admin products
export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(adminProductsFail(error.response.data.message));
  }
};

//  create new product
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const { data } = await axios.post(
      `/api/v1/admin/products/new`,
      productData
    );
    dispatch(newProductSuccess(data));
  } catch (error) {
    //handle error
    dispatch(newProductFail(error.response.data.message));
  }
};
//  delete product

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    //handle error
    dispatch(deleteProductFail(error.response.data.message));
  }
};
//  update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData
    );
    dispatch(updateProductSuccess(data.product));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewsRequest());
    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });
    dispatch(reviewsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(reviewsFail(error.response.data.message));
  }
};

export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    await axios.delete(`/api/v1/admin/review`, { params: { productId, id } });
    dispatch(deleteReviewSuccess());
  } catch (error) {
    //handle error
    dispatch(deleteReviewFail(error.response.data.message));
  }
};
