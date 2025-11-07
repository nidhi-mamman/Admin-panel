import { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { context } from "../context/Authprovider";
export default function Home() {
  const adminRef = useRef(null);
  const staffRef = useRef(null);
  const studentRef = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const { setToken } = useContext(context)

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Login successful ✅");
        navigate('/admin/roles')
        // Store tokens in localStorage
        if (data.tokens) {
          const accessToken = data.tokens.access;
          const refreshToken = data.tokens.refresh;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // ✅ Update context immediately
          setToken(accessToken);;
        }

      } else {
        setMessage(data.message || "Invalid username or password ❌");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again ❌");
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(staffRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    try {
      const response = await fetch("http://localhost:8000/api/staff/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Login successful ✅");
        navigate('/staff/roles')
        // Store tokens in localStorage
        if (data.tokens) {
          const accessToken = data.tokens.access;
          const refreshToken = data.tokens.refresh;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // ✅ Update context immediately
          setToken(accessToken);
        }

      } else {
        setMessage(data.message || "Invalid username or password ❌");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again ❌");
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
        setMessage(data.message || "Login successful ✅");
        navigate('/student/dashboard')
        // Store tokens in localStorage
        if (data.tokens) {
          const accessToken = data.tokens.access;
          const refreshToken = data.tokens.refresh;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // ✅ Update context immediately
          setToken(accessToken);
        }


      } else {
        setMessage(data.message || "Invalid username or password ❌");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again ❌");
    }
  };

  return (
    <>
      {/* <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/admin'>Admin</Link>
        <Link to='/staff'>Staff</Link>
        <Link to='/student'>Students</Link>
      </div> */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="login-form-heading">Login Here</h2>
        <div className="login-form-area">
          <div>
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
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
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
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
                    }}>
                      <i className='bxr bxs-lock-keyhole' style={{ marginRight: "8px" }}></i>
                      <input
                        type="password"
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
                      <button type="submit" className="submit-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>

                  {message && <p style={{ marginTop: "10px" }}>{message}</p>}
                </div>
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <div className="myform">
                  <form ref={staffRef} onSubmit={handleStaffSubmit}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
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
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
                    }}>
                      <i className='bxr bxs-lock-keyhole' style={{ marginRight: "8px" }}></i>
                      <input
                        type="password"
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
                      <button type="submit" className="submit-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>

                  {message && <p style={{ marginTop: "10px" }}>{message}</p>}
                </div>
              </div>
              <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                <div className="myform">
                  <form ref={studentRef} onSubmit={handleStudentSubmit}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
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
                      border: "1px solid #555",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      width: "fit-content",
                      marginBottom: "20px"
                    }}>
                      <i className='bxr bxs-lock-keyhole' style={{ marginRight: "8px" }}></i>
                      <input
                        type="password"
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
                      <button type="submit" className="submit-btn" style={{ padding: "8px 16px" }}>Login</button>
                    </div>
                  </form>

                  {message && <p style={{ marginTop: "10px" }}>{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
