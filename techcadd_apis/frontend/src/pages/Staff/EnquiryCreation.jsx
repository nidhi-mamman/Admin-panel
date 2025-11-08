import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function EnquiryCreation() {
    const formRef = useRef(null);
    const [message, setMessage] = useState("");
    const [options, setOptions] = useState(null);
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
                navigate("/");
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
                <h2>Create Enquiry</h2>

                <form ref={formRef} onSubmit={handleSubmit} className="enquiry-form">
                    <div className="form-row">
                        <input type="text" name="student_name" placeholder="Student name*" required />
                        <input type="date" name="date_of_birth" required />
                    </div>

                    <div className="form-row">
                        <input type="text" name="qualification" placeholder="Qualification*" required />
                        <input type="text" name="work_college" placeholder="Work or College*" required />
                    </div>

                    <div className="form-row">
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

                    <input type="text" name="address" placeholder="Address*" required />

                    <select name="centre" required>
                        <option value="">-- Select Centre --</option>
                        {options.centre_choices.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <div className="form-row">
                        <input type="text" name="batch_time" placeholder="Batch timing*" />
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
                        <input type="date" name="next_follow_up_date" placeholder="Follow up date*" />
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
