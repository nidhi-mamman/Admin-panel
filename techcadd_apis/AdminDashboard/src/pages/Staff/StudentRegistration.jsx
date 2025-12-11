import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
    const formRef = useRef(null);
    const [message, setMessage] = useState("");
    const [options, setOptions] = useState(null);
    const [courses, setCourses] = useState([]);
    const [studentType, setStudentType] = useState("");
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

                <form ref={formRef} onSubmit={handleSubmit} className="registration-form">
                    <h3>Personal/Educational Details</h3>
                    <div className="form-row">
                        <div className="form-registration-group">
                            <input type="text" name="student_name" placeholder="Student Name*" required />
                            <input type="text" name="father_name" placeholder="Father's Name*" required />
                            <div className="input-wrapper">
                                <input type="date" name="date_of_birth" required placeholder=" " />
                                <span>Date of Birth*</span>
                            </div>
                        </div>
                        <textarea name="contact_address" id="address" placeholder="Adress*" required></textarea>
                    </div>
                    <div className="form-row">
                        <input type="text" name="qualification" placeholder="Qualification*" required />
                        <select name="student_type" value={studentType}
                            onChange={(e) => setStudentType(e.target.value)} required>
                            <option value="">--Select Type--</option>
                            <option value="college">College</option>
                            <option value="school">School</option>
                            <option value="working">Working</option>
                        </select>

                    </div>
                    {/* 🔥 CONDITIONAL FIELDS */}

                    {/* College Fields */}
                    {studentType === "college" && (
                        <div className="form-row">
                            <input type="text" name="semester" placeholder="Semester*" required />
                            <input type="text" name="college_name" placeholder="College Name*" required />
                        </div>
                    )}

                    {/* School Fields */}
                    {studentType === "school" && (
                        <div className="form-row">
                            <input type="text" name="class_name" placeholder="Class*" required />
                            <input type="text" name="school_name" placeholder="School Name*" required />
                        </div>
                    )}

                    {/* Working Fields */}
                    {studentType === "working" && (
                        <div className="form-row">
                            <input type="text" name="job_role" placeholder="Job Role*" required />
                            <input type="text" name="company_name" placeholder="Company Name*" required />
                        </div>
                    )}

                    <h3>Contact Details</h3>
                    <div className="form-row">
                        <input type="tel" name="phone_no" pattern="[0-9]{10}" placeholder="Phone No*" required />
                        <input type="email" name="email" id="email" placeholder="Email*" required />

                    </div>
                    <div className="form-row">
                        <input type="tel" name="whatsapp_no" pattern="[0-9]{10}" placeholder="WhatsApp No*" required />
                        <input type="tel" name="parents_no" pattern="[0-9]{10}" placeholder="Parent's No*" required />
                    </div>
                    <h3>Registration Details</h3>
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

                    <textarea className="software-area" name="software_covered" placeholder="Software Covered*" required></textarea>
                    <input type="text" name="work_college" id="" />
                    <div className="form-row">
                        <select name="duration_months" required>
                            <option value="">-- Select Duration --</option>
                            {options.duration_choices?.map((d) => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>
                        <select name="class_mode" required>
                            <option value="">-- Select Mode --</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="both">Both</option>
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
