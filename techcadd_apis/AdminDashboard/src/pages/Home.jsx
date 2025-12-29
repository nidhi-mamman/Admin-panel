import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import tce_white from '../assets/tce_white.png';

export default function Home() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(context);
  const roleText = {
    admin:
      "Manage users, monitor activities, and control the entire platform from one powerful dashboard. Login as an admin to keep everything running smoothly.",
    branch:
      "Handle daily tasks, manage records, and support students effectively. Login as staff to stay organized and productive.",
    student:
      "Access your courses, track progress, and manage your learning journey. Login as a student and continue learning with confidence.",
  };
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setToast(null);
          setIsExiting(false);
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  // 🔥 FUNCTION: close toast manually
  const handleCloseToast = () => {
    setIsExiting(true);
    setTimeout(() => {
      setToast(null);


    }, 300);
  };
  // 🔥 FUNCTION: show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    let apiUrl = "";

    switch (role) {
      case "admin":
        apiUrl = "http://localhost:8000/api/admin/login/";
        break;
      case "branch":
        apiUrl = "http://localhost:8000/api/staff/branch/login/";
        break;
      case "student":
        apiUrl = "http://localhost:8000/api/student/lms/login/";
        break;
      default:
        return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.tokens) {
        showToast("Login successful", "success");

        if (data.tokens) {
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("refreshToken", data.tokens.refresh);
          setToken(data.tokens.access);
        }

        setTimeout(() => {
          navigate(
            role === "admin"
              ? "/admin/admin-dashboard"
              : role === "branch"
                ? "/branch/dashboard/"
                : "/student/dashboard"
          );
        }, 2000);

      } else {
        showToast(data.message || "Invalid username or password", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="container-fluid p-5">
      {toast && (
        <div className={`custom-toast ${toast.type} ${isExiting ? "exit" : ""}`}>
          <span>{toast.message}</span>
          <button onClick={handleCloseToast}>×</button>
        </div>
      )}

      <div className="container">
        <div className="row d-flex justify-content-center">
          {/* LEFT SIDE */}
          <div className="col-lg-6 col-sm-12 bg p-3">
            <div className="row d-flex justify-content-center text-center text-white">
              <h4 className="p-2">Welcome to</h4>
              <img className="img m-3" src={tce_white} alt="Logo" />
              <p className="m-5 role-text">
                {roleText[role]}
              </p>
              {/* ROLE SELECTOR */}
              <div className="row justify-content-start mt-4">
                {["admin", "branch", "student"].map((item) => (
                  <div
                    key={item}
                    className={`col-3 one mx-2 ${role === item ? "active-role" : ""
                      }`}
                    onClick={() => setRole(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 col-sm-12 form p-5">
            <div className="row d-flex justify-content-center">
              <h3 className="text-center mb-4">
                Login as {role.toUpperCase()}
              </h3>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
