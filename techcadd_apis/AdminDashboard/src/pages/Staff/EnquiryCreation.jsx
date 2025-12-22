import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from './EnquiryCreation.module.css';

export default function EnquiryCreation() {
    const formRef = useRef(null);
    const [message, setMessage] = useState("");
    const [options, setOptions] = useState(null);
    const [studentType, setStudentType] = useState("");
    const navigate = useNavigate();

    // 🟢 Fetch dropdown options on component mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/staff/students/options/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                const data = await res.json();
                setOptions(data);
            } catch (err) {
                console.error("Error fetching options:", err);
            }
        };
        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(formRef.current);
        const formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        try {
            const response = await fetch("http://localhost:8000/api/staff/students/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || "Enquiry created successfully ✅");
                navigate("/staff/show/enquiry-list");
            } else {
                console.error("Error:", data);
                setMessage(data.message || "Error creating enquiry❌");
            }
        } catch (error) {
            console.error("Create Enquiry error:", error);
            setMessage("Something went wrong. Please try again ❌");
        }
    };

    if (!options) return <p>Loading form options...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <h2>Create New Enquiry</h2>
                    <p>Fill in the student enquiry details below</p>
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
                                <label className={styles.label}>Date of Birth*</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className={styles.input}
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

                        <div className={`${styles.formField} ${styles.fullWidth}`}>
                            <label className={styles.label}>Address*</label>
                            <textarea
                                name="address"
                                className={styles.textarea}
                                placeholder="Enter full address"
                                required
                            />
                        </div>

                        <h3 className={styles.sectionTitle}>Contact Details</h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Mobile Number*</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    className={styles.input}
                                    placeholder="10-digit mobile number"
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
                        </div>

                        <h3 className={styles.sectionTitle}>ER Details</h3>
                        <div className={styles.formGrid}>
                            <div className={`${styles.formField} ${styles.fullWidth}`}>
                                <label className={styles.label}>Centre*</label>
                                <select name="centre" className={styles.select} required>
                                    <option value="">Select Centre</option>
                                    {options.centre_choices.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Batch Timing*</label>
                                <input
                                    type="text"
                                    name="batch_time"
                                    className={styles.input}
                                    placeholder="Enter batch timing"
                                />
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
                                <div className="form-row">
                                    <div>
                                        <label className={styles.label}>Course Fee Offer*</label>
                                        <input
                                            type="number"
                                            name="course_fee_offer"
                                            step="0.01"
                                            min="0"
                                            className={styles.input}
                                            placeholder="Enter course fee"
                                        />
                                    </div>
                                    <div>
                                        <div className={`${styles.formField} ${styles.fullWidth}`}>
                                            <label className={styles.label}>Course Interested*</label>
                                            <input
                                                type="text"
                                                name="course_interested"
                                                className={styles.input}
                                                placeholder="Enter course name"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.formField}>
                                <label className={styles.label}>Trade*</label>
                                <select name="trade" className={styles.select} required>
                                    <option value="">Select Trade</option>
                                    {options.trade_choices.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Enquiry Source*</label>
                                <select name="enquiry_source" className={styles.select} required>
                                    <option value="">Select Source</option>
                                    {options.enquiry_source_choices.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Enquiry Status*</label>
                                <select name="enquiry_status" className={styles.select} required>
                                    <option value="">Select Status</option>
                                    {options.enquiry_status_choices.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Remark</label>
                                <input
                                    type="text"
                                    name="remark"
                                    className={styles.input}
                                    placeholder="Enter remark"
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>Follow up Date*</label>
                                <input
                                    type="date"
                                    name="next_follow_up_date"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.submitButton}>
                                Create Enquiry
                            </button>
                        </div>
                    </form>

                    {message && <p style={{ marginTop: "20px", textAlign: "center", color: message.includes("✅") ? "#10b981" : "#ef4444" }}>{message}</p>}
                </div>
            </div>
        </div>
    );
}
