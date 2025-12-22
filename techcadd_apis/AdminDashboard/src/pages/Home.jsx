import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../context/Authprovider";
import login_illustration from "../assets/login_illustration.png";
import styles from './Home.module.css';
import gsap from 'gsap';

export default function Home() {
  const formRef = useRef(null);
  const mainContainerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const loginBadgeRef = useRef(null);
  const navTabsRef = useRef(null);
  const formContainerRef = useRef(null);
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');
  const navigate = useNavigate();
  const { setToken } = useContext(context);

  useEffect(() => {
    gsap.set([mainContainerRef.current, leftContainerRef.current, loginBadgeRef.current, navTabsRef.current, formContainerRef.current], {
      opacity: 0
    });
    gsap.set(mainContainerRef.current, { scale: 0.9, y: 20 });
    gsap.set(leftContainerRef.current, { x: 0 });
    gsap.set(loginBadgeRef.current, { y: -30 });
    gsap.set(navTabsRef.current, { y: -20 });
    gsap.set(formContainerRef.current, { y: 30 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(mainContainerRef.current, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.7,
    })
    .to(leftContainerRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
    }, "-=0.4")
    .to(loginBadgeRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, "-=0.3")
    .to(navTabsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, "-=0.3")
    .to(formContainerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
    }, "-=0.3");

    return () => tl.kill();
  }, []);

  // 🔥 Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setToast(null);
          setIsExiting(false);
        }, 300); // Match animation duration
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 🔥 FUNCTION: close toast manually
  const handleCloseToast = () => {
    setIsExiting(true);
    setTimeout(() => {
      setToast(null);
      setIsExiting(false);
    }, 300);
  };

  // 🔥 FUNCTION: show toast
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(formRef.current);
    const formData = Object.fromEntries(form.entries());

    let endpoint;
    let redirectPath;

    if (activeTab === 'admin') {
      endpoint = "http://localhost:8000/api/admin/login/";
      redirectPath = "/admin/admin-dashboard";
    } else if (activeTab === 'staff') {
      endpoint = "http://localhost:8000/api/staff/login/";
      redirectPath = "/staff/staff-dashboard";
    } else {
      endpoint = "http://127.0.0.1:8000/api/student/lms/login/";
      redirectPath = "/student/dashboard";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok || data.status === "success" || data.message === "Login successful") {
        showToast("Login successful", "success");

        if (data.tokens) {
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("refreshToken", data.tokens.refresh);
          setToken(data.tokens.access);
        }

        setTimeout(() => navigate(redirectPath), activeTab === 'staff' ? 1200 : 2000);
      } else {
        showToast(data.message || "Invalid username or password", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      <div className={styles.toastContainer}>
        {toast && (
          <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError} ${isExiting ? styles.toastExit : ''}`}>
            <span className={styles.toastIcon}>
              {toast.type === 'success' ? '✓' : '⚠'}
            </span>
            <span>{toast.message}</span>
            <button 
              className={styles.toastClose}
              onClick={handleCloseToast}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      <div className={styles.loginArea}>
        {/* <h2 className="login-form-heading">Login</h2> */}
        <div className="login-form-area" ref={mainContainerRef}>
          <div className="left-container" ref={leftContainerRef}>
            <img src={login_illustration} alt="login illustration" />
          </div>
          <div className="right-container" ref={rightContainerRef}>
            <p className="login-badge" ref={loginBadgeRef}>Welcome Back</p>
            <nav ref={navTabsRef}>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin')}
                  type="button"
                >
                  Admin
                </button>
                <button
                  className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`}
                  onClick={() => setActiveTab('staff')}
                  type="button"
                >
                  Staff
                </button>
                <button
                  className={`nav-link ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student')}
                  type="button"
                >
                  Student
                </button>
              </div>
            </nav>
            
            <div className="myform" ref={formContainerRef}>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <i className={`bx bxs-user ${styles.inputIcon}`}></i>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputContainerWithMargin}>
                  {passwordVisible ? (
                    <i
                      className={`bx bxs-lock-keyhole-open-alt ${styles.inputIcon}`}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    ></i>
                  ) : (
                    <i
                      className={`bx bxs-lock-keyhole ${styles.inputIcon}`}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    ></i>
                  )}
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    className={styles.inputField}
                  />
                </div>
                
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    type="submit"
                    className={`custom-btn ${styles.loginButton}`}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
