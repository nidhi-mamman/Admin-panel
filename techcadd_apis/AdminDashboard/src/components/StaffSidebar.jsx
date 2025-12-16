import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import dashboard from '../assets/pie-chart.png'
import shield from '../assets/shield.png'
import enquiry from '../assets/info.png'
import registration from '../assets/registration.png'
import signout from '../assets/signout.png'
export default function StaffSidebar() {
    const { logoutLocal, isLoggedin } = useContext(context);
    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(null);

    const handleLogout = async () => {
        await logoutLocal();
        navigate("/");
    };

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    const handleNavigate = () => {
        navigate("/staff/staff-dashboard");
    }

    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <ul>

                    {/* HOME */}
                    <li className="dashboard-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
                        <img src={dashboard} alt="" />
                        Dashboard
                    </li>
                    {/* Authentication */}
                    <li onClick={() => toggleMenu("authentication")} style={{ cursor: "pointer" }}>
                        <img src={shield} alt='' className="auth-item" />
                        Authentication
                        <i className='bx  bx-chevron-down auth-item' style={{ color: '#525562' }}></i>
                    </li>

                    {/* Authentication SUBMENU - Persistent wrapper for smooth transitions */}
                    <div className={`submenu-wrapper ${openMenu === "authentication" ? "open" : ""}`}>
                        <li
                            className="submenu-item"
                            onClick={(e) => {
                                if (isLoggedin) {
                                    e.preventDefault();
                                    alert("You are already logged in!");
                                } else {
                                    navigate("/");
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Sign in
                        </li>

                    </div>

                    {/* ENQUIRY */}
                    <li onClick={() => toggleMenu("enquiry")} style={{ cursor: "pointer" }}>
                        <img src={enquiry} alt="" />
                        Enquiry
                        <i className='bx  bx-chevron-down auth-item' style={{ color: '#525562' }}></i>
                    </li>

                    {/* ENQUIRY SUBMENU - Persistent wrapper for smooth transitions */}
                    <div className={`submenu-wrapper ${openMenu === "enquiry" ? "open" : ""}`}>
                        <li className="submenu-item">
                            <Link to="/staff/create-enquiry">New Enquiry</Link>
                        </li>
                        <li className="submenu-item">
                            <Link to="/staff/show/enquiry-list">Enquiry List</Link>
                        </li>
                    </div>

                    {/* REGISTRATION */}
                    <li onClick={() => toggleMenu("registration")} style={{ cursor: "pointer" }}>
                        <img src={registration} alt="" />
                        Registration
                        <i className='bx  bx-chevron-down auth-item' style={{ color: '#525562' }}></i>
                    </li>

                    {/* REGISTRATION SUBMENU - Persistent wrapper for smooth transitions */}
                    <div className={`submenu-wrapper ${openMenu === "registration" ? "open" : ""}`}>
                        <li className="submenu-item">
                            <Link to="/staff/student/create">New Registration</Link>
                        </li>
                        <li className="submenu-item">
                            <Link to="/staff/show/registration-list">Registration List</Link>
                        </li>
                    </div>

                    {/* LOGOUT */}
                    <li onClick={handleLogout}>
                        <img src={signout} alt="" />
                        Signout
                    </li>

                </ul>
            </div>
        </div>
    );
}
