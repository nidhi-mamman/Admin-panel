import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function CertificateStatus() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(context);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const registrationNumber = location.state?.registrationNumber;

    useEffect(() => {
        const fetchCertificateStatus = async () => {
            console.log("🔹 Function started: fetchCertificateStatus()");
            console.log("🔹 Token:", token);
            console.log("🔹 Registration number:", registrationNumber);

            try {
                if (!token) {
                    console.log("⛔ No token found. Unauthorized request.");
                    setError("Unauthorized. Please log in again.");
                    setLoading(false);
                    return;
                }

                console.log("📡 Sending POST request to backend...");
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/staff/registrations/generate-certificate/?registration_number=${registrationNumber}`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("✅ Response received successfully!");
                console.log("Response Data:", response.data);

                setStatus(response.data);
                setError(null);
            } catch (err) {
                console.error("❌ Error fetching certificate status:", err);

                if (err.response) {
                    console.log("Error Response Data:", err.response.data);
                    console.log("Error Status Code:", err.response.status);
                } else {
                    console.log("Error Message:", err.message);
                }

                if (err.response?.status === 401) {
                    setError("Session expired or unauthorized. Please log in again.");
                    setTimeout(() => navigate("/staff/login"), 2000);
                } else {
                    setError(err.response?.data?.error || "Something went wrong!");
                }
            } finally {
                console.log("🟡 Finished fetchCertificateStatus()");
                setLoading(false);
            }
        };

        if (state?.registrationNumber) {
            console.log("✅ Registration number found, fetching status...");
            fetchCertificateStatus();
        } else {
            console.log("⛔ No registration number found in state.");
            setError("Registration number not provided.");
            setLoading(false);
        }
    }, [state, token, navigate]);

    if (loading) return <p style={{ textAlign: "center" }}>Checking certificate eligibility...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ textAlign: "center" }}>Certificate Eligibility Status</h2>

            {status?.error ? (
                <div
                    style={{
                        background: "#fff3cd",
                        padding: "15px",
                        borderRadius: "8px",
                        marginTop: "15px",
                    }}
                >
                    <p><strong>{status.error}</strong></p>
                    <p>Fees Paid: ₹{status.requirements.fees_paid}</p>
                    <p>Total Fees: ₹{status.requirements.total_fees}</p>
                    <p>Course Completed: {status.requirements.course_completed ? "✅ Yes" : "❌ No"}</p>
                    <p>Course Completion Date: {status.requirements.course_completion_date}</p>
                    <p>Current Date: {status.requirements.current_date}</p>
                </div>
            ) : (
                <div
                    style={{
                        background: "#d4edda",
                        padding: "15px",
                        borderRadius: "8px",
                        marginTop: "15px",
                    }}
                >
                    <p>✅ Student is eligible for certificate.</p>
                </div>
            )}
        </div>
    );
}
