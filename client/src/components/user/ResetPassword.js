import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearAuthError } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Appbar from '../Appbar';
import backgroundImage from "../../assets/newpass.jpg"; 
import MetaData from '../layouts/MetaData';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const dispatch = useDispatch();
    //  we get data from redux state
    const { isAuthenticated, error } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        dispatch(resetPassword(formData, token));
    }

    useEffect(() => {
        if (isAuthenticated) {
            setAlertMessage('Password Reset Success!');
            setAlertVariant('success');
            setShowAlert(true);
            // navigate('/');
            return;
        }
        if (error) {
            setAlertMessage(error);
            setAlertVariant('danger');
            setShowAlert(true);
            dispatch(clearAuthError());
            return;
        }
    }, [isAuthenticated, error, dispatch, navigate]);

    return (
        <>
            <MetaData title={"Reset Password"}/>
            <Appbar/>

            <div className="row wrapper">
            <div 
                className="row justify-content-around mt-0" 
                style={{ 
                    backgroundImage: `url(${backgroundImage})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    minHeight: '100vh' 
                }}
            >

                    <div className="col-10 col-lg-5 mt-5">
                        {showAlert && (
                            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                                {alertMessage}
                            </Alert>
                        )}
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mb-3 text-white">New Password</h1>

                            <div className="form-group text-white">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group text-white">
                                <label htmlFor="confirm_password_field">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                className="btn btn-block py-3">
                                Set Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
