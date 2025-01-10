import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL, PHOTO_URL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await axios.post(BASE_URL + "/logout", {}, {
            withCredentials: true
        });
        dispatch(removeUser());
        return navigate("/login");
    }

    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">🖥️ DevTinder</Link>
            </div>
            {user && <div className="flex-none gap-2">
                <p>Welcome, {user.firstName} </p>
                <div className="dropdown dropdown-end mx-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl ? user.photoUrl : PHOTO_URL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile

                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><Link to="/requests">Requests</Link></li>
                        <li><a onClick={handleLogoutClick}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default NavBar