import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentRegistration = () => {
  const [options, setOptions] = useState(null);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    student_name: "",
    phone_no: "",
    branch: "",
    course_type: "",
    course: "",
    duration_months: "",
    joining_date: "",
    father_name: "",
    date_of_birth: "",
    email: "",
    qualification: "",
    work_college: "",
    contact_address: "",
    whatsapp_no: "",
    parents_no: "",
    software_covered: "",
    duration_hours: "",
    total_course_fee: "",
    paid_fee: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8000/api/staff/registrations/options/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOptions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching options:", err);
        setError("Failed to fetch options. Please login again.");
        setLoading(false);
      });
  }, [token]);

  // Fetch courses when course_type changes
  useEffect(() => {
    if (!formData.course_type || !token) {
      setCourses([]);
      return;
    }

    axios
      .get(
        `http://localhost:8000/api/staff/registrations/courses/${formData.course_type}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setCourses(res.data))
      .catch((err) => {
        console.error("Error fetching courses:", err);
        if (err.response?.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("accessToken");
        }
      });
  }, [formData.course_type, token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not authorized. Please log in again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/staff/registrations/create/",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Student registered successfully!");
      setFormData({
        student_name: "",
        phone_no: "",
        branch: "",
        course_type: "",
        course: "",
        duration_months: "",
        joining_date: "",
        father_name: "",
        date_of_birth: "",
        email: "",
        qualification: "",
        work_college: "",
        contact_address: "",
        whatsapp_no: "",
        parents_no: "",
        software_covered: "",
        duration_hours: "",
        total_course_fee: "",
        paid_fee: ""
      });
      setCourses([]);
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        localStorage.removeItem("accessToken");
      } else {
        alert("Failed to register student.");
      }
    }
  };

  if (loading) return <p>Loading options...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Student Registration
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >

        {/* Branch */}
        <label>
          Branch:
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Branch</option>
            {options?.branch_choices?.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {/* Joining Date */}
        <label>
          Joining Date:
          <input
            type="date"
            name="joining_date"
            placeholder="Enter joining date"
            value={formData.joining_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Student Name */}
        <label>
          Student Name:
          <input
            type="text"
            name="student_name"
            placeholder="Enter student name"
            value={formData.student_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Father's Name */}
        <label>
          Father's Name:
          <input
            type="text"
            name="father_name"
            placeholder="Enter father name"
            value={formData.father_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Date of Birth */}
        <label>
          Date of birth:
          <input
            type="date"
            name="date_of_birth"
            placeholder="Enter Date of Birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Qualification */}
        <label>
          Qualification:
          <input
            type="text"
            name="qualification"
            placeholder="Enter Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Work or College */}
        <label>
          Work or College:
          <input
            type="text"
            name="work_college"
            placeholder="Work or College"
            value={formData.work_college}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Contact Adress */}
        <label>
          Contact Address:
          <input
            type="text"
            name="contact_address"
            placeholder="Enter Contact Address"
            value={formData.contact_address}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Phone No */}
        <label>
          Phone No:
          <input
            type="tel"
            name="phone_no"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
            value={formData.phone_no}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* whatsapp No */}
        <label>
          WhatsApp No:
          <input
            type="tel"
            name="whatsapp_no"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
            value={formData.whatsapp_no}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Parent's No */}
        <label>
          Parent's No:
          <input
            type="tel"
            name="parents_no"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
            value={formData.parents_no}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Course Type */}
        <label>
          Course Type:
          <select
            name="course_type"
            value={formData.course_type}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Course Type</option>
            {options?.course_types?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        {/* Course Dropdown */}
        {courses.length > 0 ? (
          <label>
            Course Name:
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          formData.course_type &&
          !loading && (
            <p style={{ color: "gray", margin: "0" }}>
              No courses found for this type.
            </p>
          )
        )}
        {/* Software Covered */}
        <label>
          Software Covered:
          <input
            type="text"
            name="software_covered"
            placeholder="Enter software's covered"
            value={formData.software_covered}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Duration */}
        <label>
          Duration:
          <select
            name="duration_months"
            value={formData.duration_months}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Duration</option>
            {options?.duration_choices?.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        {/* Duration hours */}
        <label>
          Duration Hours:
          <input
            type="number"
            name="duration_hours"
            placeholder="Enter duration hours:"
            value={formData.duration_hours}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Total course fee */}
        <label>
          Total Course fee:
          <input
            type="number"
            name="total_course_fee"
            placeholder="Enter total course fee:"
            value={formData.total_course_fee}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        {/* Paid fee */}
        <label>
          Paid fee:
          <input
            type="number"
            name="paid_fee"
            placeholder="Enter Paid Fee:"
            value={formData.paid_fee}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

// Reusable input styling
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
};

export default StudentRegistration;
