import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import Logo from '../assets/tce_white.png'

export default function StudentsSidebar() {
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
              <img style={{width:"180px",height:"50px"}} src={Logo} alt="tce_logo" />
            </Link>
          </li>
        </ul>

        {/* Right side */}
        {isLoggedin && (
          <button
            onClick={handleLogout}
            className="submit-btn"
            style={{padding:"10px"}}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}
