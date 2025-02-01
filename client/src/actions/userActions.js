import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';



//  login frond end actions
export const login = (email, password) => async (dispatch) => {

        try {
            dispatch(loginRequest())
            const { data }  = await axios.post(`/api/v1/login`,{email,password});
            dispatch(loginSuccess(data))
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }

}

// actions/userActions.js
export const clearAuthError = () => {
    return {
        type: 'CLEAR_AUTH_ERROR'
    };
};


//  login register frontend

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}


//  load user front end keep login when we refresh

export const loadUser =  async (dispatch) => {

    try {
        dispatch(loadUserRequest())
       

        const { data }  = await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }

}

//  Logout User 

export const logout = () => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/v1/logout`);
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutFail(error));
        }
    };
};

//  Update User Profile

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.put(`/api/v1/updateProfile`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}
// Update Password
export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
}

// Forgot Password
export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                //  data json type 
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}
//  reset user password
export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}



export const getUsers = () => async (dispatch) => {
    dispatch(usersRequest());

    try {
        const response = await axios.get('/api/v1/admin/users');
        dispatch(usersSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(usersFail(errorMessage));
    }
};

export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())
        const { data }  = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}

export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }

}

export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }

}