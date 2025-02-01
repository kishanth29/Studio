import { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import Appbar from '../Appbar';
import MetaData from '../layouts/MetaData';

export default function OrderDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Select the completedOrders from Redux state
    const { completedOrders, loading } = useSelector(state => state.cartState);

    // Find the order with the given id
    const orderDetail = useMemo(() => completedOrders.find(order => order.orderDate === id) || {}, [completedOrders, id]);

    // Destructure order details
    const {
        shippingInfo = {},
        items: orderItems = [],
        totalPrice = 0,
        orderStatus = "Processing",
        paymentInfo = {}
    } = orderDetail;

    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    useEffect(() => {
        if (!orderDetail.orderDate) {
            // Logic to fetch order details if not found in completedOrders
            // Assuming you have a mechanism to fetch the order details and dispatch to store
        }
    }, [dispatch, id, orderDetail]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"Order Detail"}/>
                    <Appbar />
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order Date: {new Date(orderDetail.orderDate).toLocaleString()}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {shippingInfo.address}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : ' PAID'}</b></p>

                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}><b>Delivered</b></p>

                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems.map(item => (
                                    <div className="row my-5" key={item.product}>
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
