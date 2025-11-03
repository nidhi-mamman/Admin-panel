import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";

export default function Navbar() {
  const { isLoggedin, logout } = useContext(context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",  // places Home on left, Logout on right
        alignItems: "center",              // vertically centers both
        padding: "12px 20px",
      }}
    >
      {/* Left side */}
      <ul style={{ margin: 0, padding: 0 }}>
        <li style={{ listStyle: "none", fontWeight: "600" }}>
          <Link
            to="/"
          >
            Home
          </Link>
        </li>
      </ul>

      {/* Right side */}
      {isLoggedin && (
        <button
          onClick={handleLogout}
          style={{border:"none"}}
        >
          Logout
        </button>
      )}
    </div>
  );
}
