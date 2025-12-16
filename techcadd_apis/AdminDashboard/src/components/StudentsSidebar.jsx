import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import dashboard from '../assets/pie-chart.png'
import shield from '../assets/shield.png'
import signout from '../assets/signout.png'
export default function StudentsSidebar() {
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
        navigate("/student/dashboard");
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
