import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import Logo from "../assets/tce_logo.png";
import profile from "../assets/profilepic.jpg";
import user from "../assets/user.png";
import exit from "../assets/exit.png";

export default function StudentNavbar() {
  const { logoutLocal } = useContext(context);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown
  const handledropdown = () => {
    setOpen(prev => !prev);
  };

  // Navigate to profile
  const handleMyAccount = () => {
    setOpen(false);
    navigate("/student/profile");
  };

  // Logout
  const handleLogout = async () => {
    setOpen(false);
    await logoutLocal();
    navigate("/");
  };

  return (
    <>
      <div
        className="admin-navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
        }}
      >
        {/* Left */}
        <Link to="/">
          <img
            src={Logo}
            alt="tce_logo"
            style={{ width: "180px", height: "50px" }}
          />
        </Link>

        {/* Right */}
        <div className="profile-area">
          <div className="admin-profile d-flex flex-column align-items-center">
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={handledropdown}
            >
              <img
                src={profile}
                alt="profile"
                width={50}
                height={50}
                className="profile-img"
              />
              <i
                className="bx bx-sm bx-chevron-down auth-item"
                style={{ color: "#525562" }}
              ></i>
            </div>

            {isOpen && (
              <div className="sub-profile">
                <ul>
                  <li onClick={handleMyAccount} style={{ cursor: "pointer" }}>
                    <img src={user} alt="" width={20} height={20} />
                    <span>My Account</span>
                  </li>

                  <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <img src={exit} alt="" width={20} height={20} />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
