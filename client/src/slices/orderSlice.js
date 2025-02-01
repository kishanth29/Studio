import { createSlice } from "@reduxjs/toolkit";



const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders : [],
        adminOrders: [],
        loading: false,
        isOrderDeleted: false,
        isOrderUpdated: false
    },
    reducers: {
        //  create order
        
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        //  get orders
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        //  order details
        
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.orders
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        // Admin orders
        adminOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        //  admin delete order
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        updateOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        //  after success alert we need to change false 
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
            }
        }

    }
});

const { actions, reducer } = orderSlice;

export const { 
    // order create
    createOrderFail,
    createOrderSuccess,
    createOrderRequest,
    clearError,
    //  user order
    userOrdersFail,
    userOrdersSuccess,
    userOrdersRequest,
    // order details
    orderDetailFail,
    orderDetailSuccess,
    orderDetailRequest,
    //  admin order
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    //  delete order
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    //  update order
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
     //  after success alert we need to change false 
    clearOrderDeleted,
    clearOrderUpdated
 } = actions;

export default reducer;

