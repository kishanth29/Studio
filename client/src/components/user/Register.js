import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar';
import Footer from '../Footer';
import video from '../../assets/videos/register.mp4';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const [formErrors, setFormErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector(state => state.authState);

    const validateForm = () => {
        const errors = {};

        if (!userData.name.trim()) {
            errors.name = 'Please enter name';
        }
        if (!userData.email.trim()) {
            errors.email = 'Please enter email';
        }
        if (!userData.password.trim()) {
            errors.password = 'Please enter password';
        }
        if (!avatar) {
            errors.avatar = 'Path to avatar is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('avatar', avatar);
            dispatch(register(formData));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return;
        }
        if (error) {
            setServerError(error);
            dispatch(clearAuthError());
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={"Register Page"}/>
            <Appbar />
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="row wrapper" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="col-10 col-lg-5 mt-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-3">Register</h1>

                            {serverError && <div className="alert alert-danger">{serverError}</div>}

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    name='name'
                                    onChange={onChange}
                                    type="text"
                                    id="name_field"
                                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                />
                                {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    name='email'
                                    onChange={onChange}
                                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                />
                                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    name='password'
                                    onChange={onChange}
                                    type="password"
                                    id="password_field"
                                    className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                />
                                {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            onChange={onChange}
                                            className={`custom-file-input ${formErrors.avatar ? 'is-invalid' : ''}`}
                                            id='customFile'
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                        {formErrors.avatar && <div className="invalid-feedback">{formErrors.avatar}</div>}
                                    </div> <br />
                                    <p className="d-flex justify-content-between mb-3 text-info">
                                    <Link to='/login'>Already have an account?</Link>
                                    </p>

                                </div>
                            </div>

                            <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}
