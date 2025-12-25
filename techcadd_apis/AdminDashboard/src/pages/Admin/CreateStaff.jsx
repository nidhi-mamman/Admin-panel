import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStaff() {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(null);
  const[errors,setErrors]=useState({}) // { message, type }
  const navigate = useNavigate();

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  // Validation helper
  const validateForm = (data) => {
    const fieldErrors = {};

    // first & last name: only letters
    const nameRegex = /^[A-Za-z]+$/;
    if (!data.first_name || !nameRegex.test(data.first_name.trim())) {
      fieldErrors.first_name = "First name must contain only letters.";
    }
    if (!data.last_name || !nameRegex.test(data.last_name.trim())) {
      fieldErrors.last_name = "Last name must contain only letters.";
    }

    // username: alphanumeric only
    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!data.username || !usernameRegex.test(data.username.trim())) {
      fieldErrors.username = "Username must be letters and/or numbers only.";
    } else if (data.username.trim().length < 3) {
      fieldErrors.username = "Username must be at least 3 characters.";
    }

    // password: min 6, at least one lower, one upper, one digit and one special
    const password = data.password || "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      fieldErrors.password = "Password must be at least 6 characters and include lowercase, uppercase, number and special character.";
    }

    // email basic check
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      fieldErrors.email = "Please enter a valid email address.";
    }

    // phone: if provided, must be 10 digits
    if (data.phone && !/^\d{10}$/.test(data.phone)) {
      fieldErrors.phone = "Phone must be 10 digits.";
    }

    // role required
    if (!data.role) {
      fieldErrors.role = "Please select a role.";
    }

    // department & address required
    if (!data.department || data.department.trim().length === 0) {
      fieldErrors.department = "Department is required.";
    }
    if (!data.address || data.address.trim().length === 0) {
      fieldErrors.address = "Address is required.";
    }

    return { valid: Object.keys(fieldErrors).length === 0, fieldErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value
    }

    // Validate fields before sending
    const { valid, fieldErrors } = validateForm(formData);
    if (!valid) {
      setErrors(fieldErrors);
      const firstError = Object.values(fieldErrors)[0];
      showToast(firstError, 'error');
      return;
    }
    setErrors({});

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
        // show toast with username/password
        showToast(`Staff Created — username: ${formData.username}`, 'success');
        setMessage(data.message || "Staff created successfully ✅");
        navigate("/admin/show/staff-list");
      } else {
        console.error("Error:", data);
        const errMsg = data.message || "Error creating staff ❌";
        showToast(errMsg, 'error');
        setMessage(errMsg);
      }
    } catch (error) {
      console.error("Create Staff error:", error);
      setMessage("Something went wrong. Please try again ❌");
    }
  };


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px", marginLeft: "250px" }} className="create-staff-container">
      <div className="right-container">
        <h2 className="login-form-heading">Add Staff</h2>
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div style={{ flex: 1 }}>
              <input type="text" name="first_name" placeholder="First Name*" required />

            </div>
            <div style={{ flex: 1 }}>
              <input type="text" name="last_name" placeholder="Last Name*" required />

            </div>
          </div>
          <div className="form-group">
            <div style={{ flex: 1 }}>
              <input type="email" name="email" placeholder="Email*" required />

            </div>
            <div style={{ flex: 1 }}>
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Phone number*"
              />

            </div>
          </div>
          <div className="form-group">
            <div style={{ flex: 1 }}>
              <input type="text" name="username" placeholder="Username*" required />

            </div>
            <div style={{ flex: 1 }}>
              <input type="password" name="password" placeholder="Password*" required />

            </div>
          </div>

          <div style={{ marginTop: 8,width:"100%" }} className="form-group">
            <select name="role" id="role">
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="trainer">Trainer</option>
              <option value="counselor">Counselor</option>
            </select>

          </div>
          <div className="form-group">
            <div style={{ flex: 1 }}>
              <input type="text" name="department" placeholder="Department*" />

            </div>
            <div style={{ flex: 1 }}>
              <input type="text" name="address" placeholder="Address*" />

            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="custom-btn" style={{ padding: "8px 16px" }}>Add Staff</button>
          </div>
        </form>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>

      {/* Simple Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            background: toast.type === 'error' ? '#fee2e2' : toast.type === 'success' ? '#ecfdf5' : '#eef2ff',
            color: toast.type === 'error' ? '#9f1239' : toast.type === 'success' ? '#065f46' : '#3730a3',
            padding: '12px 16px',
            borderRadius: 8,
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            zIndex: 9999,
            minWidth: 240,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{toast.type === 'error' ? 'Error' : toast.type === 'success' ? 'Success' : 'Info'}</div>
          <div style={{ fontSize: 13 }}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
