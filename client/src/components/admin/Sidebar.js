import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaProductHunt } from "react-icons/fa6";
import { BsMinecartLoaded } from "react-icons/bs";
import { TbUserSquare } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";



export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components mt">

                    <li className='mb-2'>
                        <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
                    <li className='mb-2'>
                        <NavDropdown title={<><FaProductHunt className='mx-1' /> Product</>}>
                            <NavDropdown.Item onClick={() => navigate('/admin/products')}>
                                <BsMinecartLoaded className='mx-1' /> All
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/admin/products/create')}>
                                <i/> <IoIosCreate className='mx-1'/>Create
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                    <li  className='mb-2'>
                        <Link to="/admin/orders"><BsMinecartLoaded className='mx-1' /> Orders</Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/admin/users"><TbUserSquare className='mx-1' /> Users</Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/admin/reviews"><MdReviews className='mx-1' /> Reviews</Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/"><IoIosHome className='mx-1 my-1' /> Home</Link>
                    </li>
                   
                </ul>
            </nav>
        </div>
    ); 
}
