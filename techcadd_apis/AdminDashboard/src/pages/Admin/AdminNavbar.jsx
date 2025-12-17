import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";
import Logo from '../../assets/tce_logo.png'
import profile from '../../assets/profilepic.jpg'
import poweroff from '../../assets/logout.png'

export default function AdminNavbar() {
  const { isLoggedin, logout } = useContext(context);
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const handledropdown = () => {
    setOpen(!isOpen)
  }

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
          <div className="d-flex align-items-center justify-content-center  admin-profile flex-column">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <img src={profile} alt="" width={50} height={50} className="profile-img"  />
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
    </>
  );
}
