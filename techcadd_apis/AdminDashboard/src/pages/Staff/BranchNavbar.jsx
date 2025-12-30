import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";
import Logo from '../../assets/tce_logo.png'
import profile from '../../assets/profilepic.jpg'
import poweroff from '../../assets/logout.png'
import menu from '../../assets/menu.png'
import plus from '../../assets/add.png'
import add from '../../assets/plus.png'

export default function BranchNavbar({ toggleSidebar }) {
  const { isLoggedin, logoutLocal } = useContext(context);
  const [isOpen, setOpen] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutLocal();
    navigate("/");
  };
  const handledropdown = () => {
    setOpen(!isOpen)
    setShowQuickActions(false)
  }
  const handleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
    setOpen(false)
  }
  const goToLoginForEnquiry = () => {
    navigate("/staff/Login", {
      state: { from: "/staff/create-enquiry" }
    });
  };

  const goToLoginForRegistration = () => {
    navigate("/staff/Login", {
      state: { from: "/staff/student/create" }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px"
        }}
        className="admin-navbar"
      >
        {/* Left side */}
        <ul style={{ margin: 0, padding: 0 }}>
          <li style={{ listStyle: "none", fontWeight: "600" }}>
            <Link
              to="/"
            >
              <img style={{ width: "180px", height: "50px" }} src={Logo} alt="tce_logo" />
            </Link>
          </li>
        </ul>
        <div className="profile-area">
          <img src={plus} alt="" className="staff-quick-actions" onClick={handleQuickActions} />
          <div className='staff-quick-action-item' style={{ display: showQuickActions ? 'flex' : 'none' }} >
            <ul>
              <li><img src={add} alt="" /> <Link to='/staff/Login' style={{ color: "black", marginLeft: "0px", textDecoration: 'none' }}>Lead</Link></li>
              <li onClick={goToLoginForEnquiry} style={{ cursor: "pointer" }}>
                <img src={add} alt="" />
                <span>Visited Enquiry</span>
              </li>
              <li onClick={goToLoginForRegistration} style={{ cursor: "pointer" }}>
                <img src={add} alt="" />
                <span>Registration</span>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-center  admin-profile flex-column">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <img src={profile} alt="" width={50} height={50} className="profile-img" />
              <i className='bx bx-sm bx-chevron-down auth-item' style={{ color: '#525562' }} onClick={handledropdown}></i>
            </div>

            <div className='sub-profile' style={{ display: isOpen ? 'block' : 'none' }}>
              {isLoggedin && (
                <Link to='#' className="logout-btn" onClick={handleLogout}> <img src={poweroff} alt="" width={20} height={20} /> Logout</Link>
              )}
            </div>
          </div>
        </div>

      </div>
      <div style={{
        padding: "12px 20px"
      }}
        className="staff-mobile-menu">
        <ul style={{ margin: 0, padding: 0 }}>
          <li style={{ listStyle: "none", fontWeight: "600" }}>
            <Link
              to="/"
            >
              <img style={{ width: "180px", height: "50px" }} src={Logo} alt="tce_logo" />
            </Link>
          </li>
          <li style={{ listStyle: "none", fontWeight: "600" }}>
            <img src={plus} alt="" className="staff-quick-actions" onClick={handleQuickActions} />
            <div className='staff-quick-action-item' style={{ display: showQuickActions ? 'flex' : 'none' }} >
              <ul>
                <li><img src={add} alt="" /> <Link to='/staff/student/create' style={{ color: "black", marginLeft: "0px", textDecoration: 'none' }}>Lead</Link></li>
                <li><img src={add} alt="" /> <Link to='/staff/create-enquiry' style={{ color: "black", marginLeft: "0px", textDecoration: 'none' }}>Visited Enquiry</Link></li>
                <li><img src={add} alt="" /> <Link to='/staff/student/create' style={{ color: "black", marginLeft: "0px", textDecoration: 'none' }}>Registration</Link></li>
              </ul>
            </div>
            <img style={{ width: "30px", height: "30px" }} src={menu} alt="" onClick={toggleSidebar} />
          </li>
        </ul>
      </div>
    </>
  );
}
