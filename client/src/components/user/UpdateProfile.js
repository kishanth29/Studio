import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import Appbar from "../Appbar";
import Footer from "../Footer";
import backgroundImage from "../../assets/updateprofile.jpg"; 
import MetaData from "../layouts/MetaData";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector((state) => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/avatar.jpg");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("avatar", avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            alert("Profile updated successfully");
            dispatch(clearUpdateProfile());
        }

        if (error) {
            alert(error);
            dispatch(clearAuthError());
        }
    }, [user, isUpdated, error, dispatch]);

    return (
        <>
            <MetaData title={"update information"}/>
            <Appbar />
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
                        <h1 className="mt-2 mb-5 text-white">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field" className="text-white">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field" className="text-white">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload" className="text-white">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="avatar_upload"
                                        onChange={onChangeAvatar}
                                    />
                                    <label className="custom-file-label text-white" htmlFor="avatar_upload">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3 text-white">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
