import { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { context } from "../../context/Authprovider";
export default function Admin() {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const { setToken } = useContext(context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(formRef.current);
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

  return (
    <div style={{ maxWidth: "320px", margin: "50px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          required
          style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          required
          style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Login</button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
