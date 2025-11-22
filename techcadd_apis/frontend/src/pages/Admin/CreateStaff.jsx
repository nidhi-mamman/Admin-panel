import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import left_img from '../../assets/left-image.png'

export default function CreateStaff() {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value
    }
    console.log(localStorage.getItem("accessToken"))
    try {
      const response = await fetch("http://localhost:8000/api/admin/staff/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Staff created successfully ✅");
        navigate("/admin/show/staff-list");
      } else {
        console.error("Error:", data);
        setMessage(data.message || "Error creating staff ❌");
      }
    } catch (error) {
      console.error("Create Staff error:", error);
      setMessage("Something went wrong. Please try again ❌");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
      <div className="right-container" style={{ height: "50%", width: "50%" }}>
        <h2 className="login-form-heading">Create Staff</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="first_name" placeholder="First Name*" required />
            <input type="text" name="last_name" placeholder="Last Name*" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email*" required />
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Phone number*"
            />
          </div>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username*" required />
            <input type="password" name="password" placeholder="Password*" required />
          </div>

          <select name="role" id="role">
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="trainer">Trainer</option>
            <option value="counselor">Counselor</option>
          </select>
          <div className="form-group">
            <input type="text" name="department" placeholder="Department*" />
            <input type="text" name="address" placeholder="Address*" />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="custom-btn" style={{ padding: "8px 16px" }}>Add Staff</button>
          </div>
        </form>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
}
