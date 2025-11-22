import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
    const formRef = useRef(null);
    const [message, setMessage] = useState("");
    const [options, setOptions] = useState(null);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // 🟢 Fetch dropdown options on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/staff/registrations/options/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                const data = await res.json();
                console.log("Fetched options:", data);
                setOptions(data);
            } catch (err) {
                console.error("Error fetching options:", err);
            }
        };
        fetchOptions();
    }, []);

    // 🟡 Fetch courses when course_type changes
    const handleCourseTypeChange = async (e) => {
        const value = e.target.value;
        const token = localStorage.getItem("accessToken");
        const formData = new FormData(formRef.current);
        formData.set("course_type", value);

        if (!value) {
            setCourses([]);
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8000/api/staff/registrations/courses/${value}/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    // 🟢 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(formRef.current);
        const jsonData = {};
        for (let [key, value] of form.entries()) {
            jsonData[key] = value;
        }

        try {
            const response = await fetch("http://localhost:8000/api/staff/registrations/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(jsonData),
            });

            const data = await response.json();
            if (response.ok) {
                const { username, password } = data?.login_credentials || {};
                alert(`✅ Student registered successfully!\n\n🆔 Username: ${username}\n🔑 Password: ${password}`);
                formRef.current.reset();
                setCourses([]);
                navigate("/staff/show/registration-list");
            }
            else {
                console.error("Error:", data);
                setMessage(data.message || "Failed to register student ❌");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setMessage("Something went wrong. Please try again ❌");
        }
    };

    if (!options) return <p>Loading form options...</p>;

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="registration-container">
                <h2 className="login-form-heading">Student Registration</h2>

                <form ref={formRef} onSubmit={handleSubmit} className="registration-form">

                    <div className="form-row">
                        <select name="branch" required>
                            <option value="">-- Select Branch --</option>
                            {options.branch_choices?.map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        <div className="input-wrapper">
                            <input type="date" name="joining_date" required placeholder=" " />
                            <span>Joining Date*</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <input type="text" name="student_name" placeholder="Student Name*" required />
                        <input type="text" name="father_name" placeholder="Father's Name*" required />
                    </div>

                    <div className="form-row">
                        <div className="input-wrapper">
                            <input type="date" name="date_of_birth" required placeholder=" " />
                            <span>Date of Birth*</span>
                        </div>
                        <input type="email" name="email" placeholder="Email*" required />
                    </div>

                    <div className="form-row">
                        <input type="text" name="qualification" placeholder="Qualification*" required />
                        <input type="text" name="work_college" placeholder="Work or College*" required />
                    </div>

                    <input type="text" name="contact_address" placeholder="Contact Address*" required />

                    <div className="form-row">
                        <input type="tel" name="phone_no" pattern="[0-9]{10}" placeholder="Phone No*" required />
                        <input type="tel" name="whatsapp_no" pattern="[0-9]{10}" placeholder="WhatsApp No*" required />
                    </div>

                    <input type="tel" name="parents_no" pattern="[0-9]{10}" placeholder="Parent's No*" required />
                    <div className="form-row">
                        <select name="course_type" onChange={handleCourseTypeChange} required>
                            <option value="">-- Select Course Type --</option>
                            {options.course_types?.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>

                        {courses.length > 0 ? (
                            <select name="course" required>
                                <option value="">-- Select Course --</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        ) : (
                            <select disabled>
                                <option>No courses available</option>
                            </select>
                        )}
                    </div>

                    <input type="text" name="software_covered" placeholder="Software Covered*" required />

                    <div className="form-row">
                        <select name="duration_months" required>
                            <option value="">-- Select Duration --</option>
                            {options.duration_choices?.map((d) => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>

                        <input type="number" name="duration_hours" placeholder="Duration Hours*" required />
                    </div>

                    <div className="form-row">
                        <input type="number" name="total_course_fee" placeholder="Total Course Fee*" required />
                        <input type="number" name="paid_fee" placeholder="Paid Fee*" required />
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <button type="submit" className="custom-btn" style={{ padding: "10px" }}>
                            Register
                        </button>
                    </div>
                </form>

                {message && (
                    <pre className="registration-message" style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
                        {message}
                    </pre>
                )}
            </div>
        </div>
    );
}
