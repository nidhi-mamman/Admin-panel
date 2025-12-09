import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="d-flex align-items-center justify-content-center">
            <div className="enquiry-container">

                <form ref={formRef} onSubmit={handleSubmit} className="enquiry-form">
                    <div>
                        <h3>Personal/Educational Details</h3>
                        <div className="form-row">
                            <input type="text" name="student_name" placeholder="Student name*" required />
                            <div className="input-wrapper">
                                <input type="date" name="date_of_birth" required placeholder=" " />
                                <span>Date of Birth*</span>
                            </div>
                        </div>
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
                    <div>
                        <h3>Contact Details</h3>
                        <div className="form-row">
                            <textarea name="address" id="address" placeholder="Adress*" required></textarea>
                            <div className="form-enquiry-group">
                                <input
                                    type="tel"
                                    name="mobile"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    placeholder="Mobile number*"
                                    required
                                />
                                <input type="email" name="email" placeholder="Email*" required />
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <h3>ER Details</h3>
                    <select name="centre" required>
                        <option value="">-- Select Centre --</option>
                        {options.centre_choices.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <div className="form-row">
                        <input type="text" name="batch_time" placeholder="Batch timing*" />
                        <select name="class_mode" required>
                            <option value="">-- Select Mode--</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="both">Both</option>
                        </select>
                        <input type="number" name="course_fee_offer" step="0.01" min="0" placeholder="Course fee offer*" />
                    </div>

                    <input type="text" name="course_interested" placeholder="Course Interested*" />

                    <select name="trade" required>
                        <option value="">-- Select Trade --</option>
                        {options.trade_choices.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <select name="enquiry_source" required>
                        <option value="">-- Select Source --</option>
                        {options.enquiry_source_choices.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <select name="enquiry_status" required>
                        <option value="">-- Select Status --</option>
                        {options.enquiry_status_choices.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <div className="form-row">
                        <input type="text" name="remark" placeholder="Remark*" />
                        <div className="input-wrapper">
                            <input type="date" name="next_follow_up_date" required placeholder=" " />
                            <span>Follow up Date*</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <button type="submit" className="custom-btn" style={{ padding: "10px" }}>Create Enquiry</button>
                    </div>
                </form>

                {message && <p className="enquiry-message">{message}</p>}
            </div>
        </div>
    );

}
