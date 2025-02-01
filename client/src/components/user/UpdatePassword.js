import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import Appbar from '../Appbar';
import Footer from "../Footer";
import backgroundImage from "../../assets/updateprofile.jpg"; 
import MetaData from '../layouts/MetaData';


const UpdatePassword = React.memo(() => {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [alert, setAlert] = useState(null);

    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState);

    const submitHandler = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData));
    }, [dispatch, oldPassword, password]);

    useEffect(() => {
        if (isUpdated) {
            setAlert({ type: 'success', message: 'Password updated successfully' });
            setOldPassword("");
            setPassword("");
        } else if (error) {
            setAlert({ type: 'danger', message: error });
            dispatch(clearAuthError());
        }
    }, [isUpdated, error, dispatch]);

    const alertMessage = useMemo(() => (
        alert && <div className={`alert alert-${alert.type} mt-4`}>{alert.message}</div>
    ), [alert]);

    return (
        <>
            <MetaData title={"Üpdate Password"}/>
            <Appbar />
            <div 
                className="row justify-content-around mt-0" // Change mt-5 to mt-0
                style={{ 
                    backgroundImage: `url(${backgroundImage})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    minHeight: '100vh' 
                }}
            >
            <div className="row wrapper text-white">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>

                        {alertMessage}

                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
            </div>
            <Footer/>
            
        </>
    );
});

export default UpdatePassword;
