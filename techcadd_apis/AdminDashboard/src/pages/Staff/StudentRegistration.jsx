import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from './StudentRegistration.module.css';

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
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <h2>Student Registration</h2>
                    <p>Complete the registration form to enroll a new student</p>
                </div>

                <div className={styles.formContent}>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <h3 className={styles.sectionTitle}>Personal/Educational Details</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Student Name*</label>
                                <input 
                                    type="text" 
                                    name="student_name" 
                                    className={styles.input} 
                                    placeholder="Enter student name" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Father's Name*</label>
                                <input 
                                    type="text" 
                                    name="father_name" 
                                    className={styles.input} 
                                    placeholder="Enter father's name" 
                                    required 
                                />
                            </div>
                            
                            <div className={styles.formField}>
                                <label className={styles.label}>Date of Birth*</label>
                                <input 
                                    type="date" 
                                    name="date_of_birth" 
                                    className={styles.input} 
                                    required 
                                />
                            </div>
                            <div className={`${styles.formField} ${styles.fullWidth}`}>
                                <label className={styles.label}>Address*</label>
                                <textarea 
                                    name="contact_address" 
                                    className={styles.textarea} 
                                    placeholder="Enter full address" 
                                    required
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Qualification*</label>
                                <input 
                                    type="text" 
                                    name="qualification" 
                                    className={styles.input} 
                                    placeholder="Enter qualification" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Student Type*</label>
                                <select 
                                    name="student_type" 
                                    className={styles.select} 
                                    value={studentType}
                                    onChange={(e) => setStudentType(e.target.value)} 
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="college">College</option>
                                    <option value="school">School</option>
                                    <option value="working">Working</option>
                                </select>
                            </div>
                        </div>

                        {/* Conditional Fields */}
                        {studentType === "college" && (
                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Semester*</label>
                                    <input 
                                        type="text" 
                                        name="semester" 
                                        className={styles.input} 
                                        placeholder="Enter semester" 
                                        required 
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>College Name*</label>
                                    <input 
                                        type="text" 
                                        name="college_name" 
                                        className={styles.input} 
                                        placeholder="Enter college name" 
                                        required 
                                    />
                                </div>
                            </div>
                        )}

                        {studentType === "school" && (
                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Class*</label>
                                    <input 
                                        type="text" 
                                        name="class_name" 
                                        className={styles.input} 
                                        placeholder="Enter class" 
                                        required 
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>School Name*</label>
                                    <input 
                                        type="text" 
                                        name="school_name" 
                                        className={styles.input} 
                                        placeholder="Enter school name" 
                                        required 
                                    />
                                </div>
                            </div>
                        )}

                        {studentType === "working" && (
                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Job Role*</label>
                                    <input 
                                        type="text" 
                                        name="job_role" 
                                        className={styles.input} 
                                        placeholder="Enter job role" 
                                        required 
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Company Name*</label>
                                    <input 
                                        type="text" 
                                        name="company_name" 
                                        className={styles.input} 
                                        placeholder="Enter company name" 
                                        required 
                                    />
                                </div>
                            </div>
                        )}

                        <h3 className={styles.sectionTitle}>Contact Details</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Phone Number*</label>
                                <input 
                                    type="tel" 
                                    name="phone_no" 
                                    pattern="[0-9]{10}" 
                                    className={styles.input} 
                                    placeholder="10-digit phone number" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Email*</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className={styles.input} 
                                    placeholder="email@example.com" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>WhatsApp Number*</label>
                                <input 
                                    type="tel" 
                                    name="whatsapp_no" 
                                    pattern="[0-9]{10}" 
                                    className={styles.input} 
                                    placeholder="10-digit WhatsApp number" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Parent's Number*</label>
                                <input 
                                    type="tel" 
                                    name="parents_no" 
                                    pattern="[0-9]{10}" 
                                    className={styles.input} 
                                    placeholder="10-digit parent's number" 
                                    required 
                                />
                            </div>
                        </div>

                        <h3 className={styles.sectionTitle}>Registration Details</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Branch*</label>
                                <select name="branch" className={styles.select} required>
                                    <option value="">Select Branch</option>
                                    {options.branch_choices?.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Joining Date*</label>
                                <input 
                                    type="date" 
                                    name="joining_date" 
                                    className={styles.input} 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Course Type*</label>
                                <select 
                                    name="course_type" 
                                    className={styles.select} 
                                    onChange={handleCourseTypeChange} 
                                    required
                                >
                                    <option value="">Select Course Type</option>
                                    {options.course_types?.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Course*</label>
                                {courses.length > 0 ? (
                                    <select name="course" className={`${styles.select} ${styles.selectFixed}`} required>
                                        <option value="">Select Course</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className={`${styles.select} ${styles.selectFixed}`} disabled>
                                        <option>No courses available</option>
                                    </select>
                                )}
                            </div>
                            <div className={`${styles.formField} ${styles.fullWidth}`}>
                                <label className={styles.label}>Software Covered*</label>
                                <textarea 
                                    name="software_covered" 
                                    className={styles.textarea} 
                                    placeholder="Enter software covered in the course" 
                                    required
                                />
                            </div>
                            <div className={`${styles.formField} ${styles.fullWidth}`}>
                                <label className={styles.label}>Work or College</label>
                                <input 
                                    type="text" 
                                    name="work_college" 
                                    className={styles.input} 
                                    placeholder="Enter work college (optional)" 
                                />
                            </div>
                        </div>

                        <div className={`${styles.formGrid} ${styles.threeColumn}`}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Duration*</label>
                                <select name="duration_months" className={styles.select} required>
                                    <option value="">Select Duration</option>
                                    {options.duration_choices?.map((d) => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Class Mode*</label>
                                <select name="class_mode" className={styles.select} required>
                                    <option value="">Select Mode</option>
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Duration Hours*</label>
                                <input 
                                    type="number" 
                                    name="duration_hours" 
                                    className={styles.input} 
                                    placeholder="Enter duration hours" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Total Course Fee*</label>
                                <input 
                                    type="number" 
                                    name="total_course_fee" 
                                    className={styles.input} 
                                    placeholder="Enter total course fee" 
                                    required 
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Paid Fee*</label>
                                <input 
                                    type="number" 
                                    name="paid_fee" 
                                    className={styles.input} 
                                    placeholder="Enter paid amount" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.submitButton}>
                                Register Student
                            </button>
                        </div>
                    </form>

                    {message && (
                        <pre style={{ marginTop: "20px", textAlign: "center", whiteSpace: "pre-wrap", color: message.includes("✅") ? "#10b981" : "#ef4444" }}>
                            {message}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
