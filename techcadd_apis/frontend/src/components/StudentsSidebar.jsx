import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import Logo from '../assets/tce_white.png';

export default function StaffSidebar() {
  const { logout } = useContext(context);
  const navigate = useNavigate();

 
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to='/'><img src={Logo} alt="tce_logo" style={{ width: "180px", height: "50px" }} /></Link>
      </div>

      <div className="sidebar-items">
        <ul>

          {/* HOME */}
          <li>
            <i className='bx bx-sm bx-home-alt'></i>
            Home
          </li>

          {/* LOGOUT */}
          <li onClick={handleLogout}>
            <i className='bx bx-sm bx-arrow-out-left-square-half'></i>
            Logout
          </li>

        </ul>
      </div>
    </div>
  );
}
