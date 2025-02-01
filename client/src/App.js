import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import { HelmetProvider } from "react-helmet-async";
import Programs from "./pages/programs";
import Workouts from "./pages/workouts";
import Membership from "./pages/membership";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/layouts/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import Dashboard from "./components/admin/Dashboard";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import { loadStripe } from "@stripe/stripe-js";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";
import ErrorBoundary from "./ErrorBoundary";
// import OrderList from './components/admin/OrderList';
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QdNksED6JuvuPX6XdwiekjMqoHWPiywwGuGIlRJR6YeVDvCpiL2B2WJIgOV6XhqhLq9hGOdIVK1ScQ8aBXR2Z1t00cKBMWoZT"
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastContainer />
        <HelmetProvider>
          <Routes>
            {/* Users Route */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/membership" element={<Membership />} />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute isAdmin={false}>
                  {" "}
                  <ProductDetail />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/update/password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  {" "}
                  <Shipping />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  {" "}
                  <ConfirmOrder />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/success"
              element={
                <ProtectedRoute>
                  {" "}
                  <OrderSuccess />{" "}
                </ProtectedRoute>
              }
            />
            {/* <Route path="/orders" element={ <ProtectedRoute> <UserOrders/> </ProtectedRoute>  } /> */}
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <OrderDetail />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <ProductList />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <NewProduct />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <UpdateProduct />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <UserOrders />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <UserList />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <UpdateUser />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  {" "}
                  <ReviewList />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
