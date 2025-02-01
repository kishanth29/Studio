import {
    adminOrdersFail, 
    adminOrdersRequest, 
    adminOrdersSuccess, 
    createOrderFail, 
    createOrderRequest, 
    createOrderSuccess, 
    deleteOrderFail, 
    deleteOrderRequest, 
    deleteOrderSuccess, 
    orderDetailFail, 
    orderDetailRequest, 
    orderDetailSuccess, 
    updateOrderFail, 
    updateOrderRequest, 
    updateOrderSuccess, 
    userOrdersFail, 
    userOrdersRequest, 
    userOrdersSuccess 

} from '../slices/orderSlice';

import axios from 'axios';
import { deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, reviewsFail, reviewsRequest, reviewsSuccess } from '../slices/productSlice';

//   create order
export const createOrder = order => async(dispatch) => {
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`/api/v1/order/new`, order)
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

//  get orders
export const userOrders = async(dispatch) => {
    try {
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`/api/v1/myorders`)
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
//  get order details 

export const orderDetail = id => async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const {data} = await axios.get(`/api/v1/order/${id}`)
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}



//  admin orders

export const adminOrders = async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`/api/v1/admin/orders`)
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`/api/v1/admin/order/${id}`)
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData)  => async(dispatch) => {
    try {
       dispatch(updateOrderRequest())
       const { data} = await axios.put(`/api/v1/admin/order/${id}`, orderData)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response.data.message))
    }
}


export const getReviews =  id => async (dispatch) => {

    try {  
        dispatch(reviewsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/reviews`,{params: {id}});
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

export const deleteReview =  (productId, id) => async (dispatch) => {

    try {  
        dispatch(deleteReviewRequest()) 
        await axios.delete(`/api/v1/admin/review`,{params: {productId, id}});
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}