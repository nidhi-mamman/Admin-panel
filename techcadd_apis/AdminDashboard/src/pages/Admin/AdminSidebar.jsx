import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";
import dashboard from '../../assets/pie-chart.png'
import shield from '../../assets/shield.png'
import enquiry from '../../assets/info.png'
import registration from '../../assets/registration.png'
import signout from '../../assets/signout.png'
import staff from '../../assets/team.png'
export default function AdminSidebar({isOpen}) {
    const { logoutAdmin } = useContext(context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAdmin();
        navigate("/");
    };


    const handleNavigate = () => {
        navigate("/admin/admin-dashboard");
    }


    const handleStaffList = () => {
        navigate("/admin/show/staff-list");
    }
    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-items">
                <ul>

                    {/* HOME */}
                    <li className="dashboard-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
                        <img src={dashboard} alt="" />
                        Dashboard
                    </li>
                    {/* Lead */}
                    <li  style={{ cursor: "pointer" }}>
                        <img src={shield} alt='' className="auth-item" />
                        Lead
                    </li>
                    <li onClick={handleStaffList} style={{ cursor: "pointer" }}>
                        <img src={staff} alt="" />
                        Staff
                    </li>
                    {/* ENQUIRY */}
                    <li style={{ cursor: "pointer" }}>
                        <img src={enquiry} alt="" />
                        Visited Enquiry
                    </li>

                    {/* REGISTRATION */}
                    <li style={{ cursor: "pointer" }}>
                        <img src={registration} alt="" />
                        Registrations
                    </li>

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
