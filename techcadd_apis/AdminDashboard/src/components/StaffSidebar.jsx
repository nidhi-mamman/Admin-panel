import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import Logo from '../assets/tce_white.png';

export default function StaffSidebar() {
  const { logout } = useContext(context);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
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

          {/* ENQUIRY */}
          <li onClick={() => toggleMenu("enquiry")} style={{ cursor: "pointer" }}>
            <i className='bx bx-sm bx-edit'></i>
            Enquiry
          </li>

          {/* ENQUIRY SUBMENU */}
          {openMenu === "enquiry" && (
            <>
              <li className="submenu-item">
                <Link to="/staff/create-enquiry">New Enquiry</Link>
              </li>
              <li className="submenu-item">
                <Link to="/staff/show/enquiry-list">Enquiry List</Link>
              </li>
            </>
          )}

          {/* REGISTRATION */}
          <li onClick={() => toggleMenu("registration")} style={{ cursor: "pointer" }}>
            <i className='bx bx-sm bx-stamp'></i>
            Registration
          </li>

          {/* REGISTRATION SUBMENU */}
          {openMenu === "registration" && (
            <>
              <li className="submenu-item">
                <Link to="/staff/student/create">New Registration</Link>
              </li>
              <li className="submenu-item">
                <Link to="/staff/show/registration-list">Registration List</Link>
              </li>
            </>
          )}

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
