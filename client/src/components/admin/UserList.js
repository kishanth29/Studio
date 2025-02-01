import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import Sidebar from "./Sidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Email', field: 'email', sort: 'asc' },
                { label: 'Role', field: 'role', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-info">
                            <i className=""> <FaEdit/>  </i>
                        </Link>
                        <Link onClick={e => deleteHandler(e, user._id)} className="btn btn-danger ms-2">
                            <i className=""> <MdDelete/> </i>
                        </Link>
                    </Fragment>
                )
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
        if (isUserDeleted) {
            alert('User Deleted Successfully!');
            dispatch(clearUserDeleted());
        }

        dispatch(getUsers());
    }, [dispatch, error, isUserDeleted]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">User List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setUsers()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </Fragment>
            </div>
        </div>
    );
}
