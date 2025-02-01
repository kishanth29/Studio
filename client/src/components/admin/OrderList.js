import { Fragment, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import Sidebar from "./Sidebar"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-info">
                            <i className=""> <FaEdit/> </i>
                        </Link>
                        <Link onClick={e => deleteHandler(e, order._id)} className="btn btn-danger ms-2">
                            <i > <MdDelete/> </i>
                        </Link>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            alert(`Error: ${error}`);
            dispatch(clearError());
            return;
        }
        if (isOrderDeleted) {
            alert('Order Deleted Successfully!');
            dispatch(clearOrderDeleted());
            return;
        }

        dispatch(adminOrdersAction);
    }, [dispatch, error, isOrderDeleted]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Order List</h1>
                <Fragment>
                    {loading ? <Loader /> : 
                        <MDBDataTable
                            data={setOrders()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </Fragment>
            </div>
        </div>
    )
}
