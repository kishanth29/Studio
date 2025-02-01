import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { forgotPassword, clearAuthError } from "../../actions/userActions";
import Appbar from "../Appbar";
import backgroundImage from "../../assets/forgot.jpg";
import MetaData from "../layouts/MetaData";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");
    const [result, setResult] = useState("");

    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Dispatch forgotPassword action
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
        
        // Reset result state and set loading message
        setResult("Sending....");
    };

    useEffect(() => {
        if (message) {
            console.log("Message received:", message);  

            // Prepare email form data with reset link
            const emailFormData = new FormData();
            emailFormData.append("name", "Password Reset");
            emailFormData.append("email", email);
            emailFormData.append("message", `Click here to reset your password: ${message}`);
            emailFormData.append("access_key", "8d8f3462-ce60-4b78-a568-2159755c1495");

            // Send email via Web3Forms API
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: emailFormData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setResult("Form Submitted Successfully");
                    setAlertMessage("Reset link sent successfully to your email.");
                    setAlertVariant("success");
                } else {
                    setResult(data.message);
                    setAlertMessage("Failed to send reset link.");
                    setAlertVariant("danger");
                }
                setShowAlert(true);
            })
            .catch(error => {
                setResult("An error occurred while sending the reset link.");
                setAlertMessage("An error occurred while sending the reset link.");
                setAlertVariant("danger");
                setShowAlert(true);
            });

            setEmail(""); 
        }

        if (error) {
            setAlertMessage(error);
            setAlertVariant("danger");
            setShowAlert(true);
            dispatch(clearAuthError());
        }
    }, [message, error, dispatch]);

    return (
        <>
            <MetaData title={"Update Password"}/>
            <Appbar />
            <div
                className="row justify-content-around mt-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
                }}
            >
                <div className="row wrapper mt-5 text-white">
                    <div className="col-10 col-lg-5 mt-5">
                        {showAlert && (
                            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                                {alertMessage}
                            </Alert>
                        )}
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mb-3">Forgot Password</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Enter Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                id="forgot_password_button"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                Get Link
                            </button>
                        </form>
                        <span>{result}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
