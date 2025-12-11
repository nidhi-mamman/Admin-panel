import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { context } from "../context/Authprovider";
import login_illustration from '../assets/login_illustration.png'
export default function Home() {
  const adminRef = useRef(null);
  const staffRef = useRef(null);
  const studentRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate()
  const { setToken } = useContext(context)
  // 🔥 Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 🔥 FUNCTION: show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(adminRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    try {
      const response = await fetch("http://localhost:8000/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Login successful ✅", "success");

        // store access/refresh
        if (data.tokens) {
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("refreshToken", data.tokens.refresh);
          setToken(data.tokens.access);
        }

        // wait & redirect
        setTimeout(() => navigate("/admin/admin-dashboard"), 2000);
      }
      else {
        showToast(data.message || "Invalid username or password ❌", "error");
      }

    } catch (error) {
      showToast("Something went wrong ❌", "error");
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(staffRef.current);
    const formData = Object.fromEntries(form.entries());

    try {
      const response = await fetch("http://localhost:8000/api/staff/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // 🔥 Backend may return success but not `response.ok`
      if (response.ok || data.status === "success" || data.message === "Login successful") {
        showToast("Login successful ✅", "success");

        if (data.tokens) {
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("refreshToken", data.tokens.refresh);
          setToken(data.tokens.access);
        }

        setTimeout(() => navigate("/staff/staff-dashboard"), 1200);
        return;
      }

      // ❌ If not ok, show error
      showToast(data.message || "Invalid username or password ❌", "error");

    } catch (error) {
      showToast("Something went wrong ❌", "error");
    }
  };


  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(studentRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/student/lms/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Login successful ✅", "success");
        navigate('/staff/staff-dashboard');
        if (data.tokens) {
          const accessToken = data.tokens.access;
          const refreshToken = data.tokens.refresh;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // ✅ Update context immediately
          setToken(accessToken);
        }


      } else {
        showToast(data.message || "Invalid username or password ❌", "error");
      }

    } catch (error) {
      showToast("Something went wrong ❌", "error");
    }
  };

  return (
    <>
      <div className="toast-container">
        {toast && (
          <div className={`custom-toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center login-area">
        {/* <h2 className="login-form-heading">Login</h2> */}
        <div className="login-form-area">
          <div className="left-container">
            <img src={login_illustration} alt="login illustration" />
          </div>
          <div className="right-container">
            <p className="login-badge">Welcome Back</p>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link  active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Admin</button>
                <button className="nav-link " id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Staff</button>
                <button className="nav-link " id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Student</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                <div className="myform">
                  <form ref={adminRef} onSubmit={handleSubmit}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      border: "1px solid #c5bfbfff"
                    }}>
                      <i className='bx bxs-user' style={{ marginRight: "8px" }}></i>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          width: "320px"
                        }}
                      />
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px",
                      border: "1px solid #c5bfbfff"
                    }}>
                      {
                        passwordVisible ?
                          <i className='bx  bxs-lock-keyhole-open-alt' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i> :
                          <i className='bxr bxs-lock-keyhole' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i>

                      }
                      <input
                        type={`${passwordVisible ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          width: "320px",
                        }}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="custom-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>


                </div>
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <div className="myform">
                  <form ref={staffRef} onSubmit={handleStaffSubmit}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      border: "1px solid #c5bfbfff"
                    }}>
                      <i className='bx bxs-user' style={{ marginRight: "8px" }}></i>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none!important",
                          fontSize: "14px",
                          width: "320px",
                        }}
                      />
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px",
                      border: "1px solid #c5bfbfff"
                    }}>
                      {
                        passwordVisible ?
                          <i className='bxs bx-lock-keyhole-open-alt' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i> :
                          <i className='bx bxs-lock-keyhole' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i>
                      }
                      <input
                        type={`${passwordVisible ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          width: "320px"
                        }}
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="custom-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>


                </div>
              </div>
              <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                <div className="myform">
                  <form ref={studentRef} onSubmit={handleStudentSubmit}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      border: "1px solid #c5bfbfff"
                    }}>
                      <i className='bx bxs-user' style={{ marginRight: "8px" }}></i>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          width: "320px",
                        }}
                      />
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px",
                      border: "1px solid #c5bfbfff"
                    }}>
                      {
                        passwordVisible ?
                          <i className='bxs  bx-lock-keyhole-open-alt' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i> :
                          <i className='bxr bxs-lock-keyhole' style={{ marginRight: "8px" }} onClick={() => { setPasswordVisible(!passwordVisible) }}></i>
                      }
                      <input
                        type={`${passwordVisible ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        required
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          fontSize: "14px",
                          width: "320px",
                        }}
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="custom-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
