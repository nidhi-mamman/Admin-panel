import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";
import dashboard from '../../assets/pie-chart.png'
import shield from '../../assets/shield.png'
import enquiry from '../../assets/info.png'
import registration from '../../assets/registration.png'
import signout from '../../assets/signout.png'
export default function StaffSidebar({ isOpen }) {
    const { logoutLocal } = useContext(context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutLocal();
        navigate("/");
    };

    const handleNavigate = () => {
        navigate("/staff/staff-dashboard");
    }

    const handleEnquiry=()=>{
        navigate("/staff/show/enquiry-list");
    }
    
    const handleRegistration=()=>{ 
        navigate('/staff/show/registration-list')
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
                    {/* Authentication */}
                    <li style={{ cursor: "pointer" }}>
                        <img src={shield} alt='' className="auth-item" />
                        Leads
                    </li>


                    {/* ENQUIRY */}
                    <li style={{ cursor: "pointer" }} onClick={handleEnquiry}>
                        <img src={enquiry} alt="" />
                        Visited Enquiry
                    </li>


                    {/* REGISTRATION */}
                    <li style={{ cursor: "pointer" }} onClick={handleRegistration}>
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
