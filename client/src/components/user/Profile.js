import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Appbar from "../Appbar";
import Footer from "../Footer";
import backgroundImage from "../../assets/update.jpg";
import MetaData from "../layouts/MetaData";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Fragment>
        <Appbar />
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-5">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MetaData title={"my Profile"} />
      <Appbar />
      <div
        className="row justify-content-around mt-0" // Change mt-5 to mt-0
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="col-12 col-md-3 mt-4 d-flex flex-column  align-content-center">
          <figure className="avatar avatar-profile mb-3">
            <img
              className="rounded-circle img-fluid"
              src={user.avatar ?? "./images/avatar.jpg"}
              alt=""
            />
          </figure>
          <Link
            to="/myprofile/update"
            id="edit_profile"
            className="btn btn-primary btn-block my-5"
          >
            Edit Profile
          </Link>
        </div>

        <div className="col-12 col-md-5 mt-4 text-white align-content-center">
          <h4>
            {" "}
            <b>Full Name</b>
          </h4>
          <p>{user.name}</p>

          <h4>
            <b>Email Address</b>
          </h4>
          <p>{user.email}</p>

          <h4>
            {" "}
            <b>Joined</b>
          </h4>
          <p>Today</p>

          <div className="row">
            {/* <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <Link to="/orders" className="btn btn-danger btn-block">
                                My Orders
                            </Link>
                        </div> */}
            <div className="col-12 col-md-6">
              <Link
                to="/myprofile/update/password"
                className="btn btn-primary btn-block"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
