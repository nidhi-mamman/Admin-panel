import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import Logo from '../assets/tce_white.png'
import profile from '../assets/profile.png'
import poweroff from '../assets/power-off.png'

export default function AdminNavbar() {
  const { isLoggedin, logout } = useContext(context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
        }}
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
            <div className="d-flex align-items-center justify-content-center">
              <img src={profile} alt="" width={60} height={60} />
            </div>

            <div className="sub-profile">
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
