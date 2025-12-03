import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { Link } from "react-router-dom";

export default function EnquiryList() {
    const { token } = useContext(context);
    const [enquiryList, setEnquiryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnquiry = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/staff/students/list/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch enquiry list");

                const data = await response.json();
                setEnquiryList(data.students || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiry();
    }, [token]);


    if (loading) return <p style={{ textAlign: "center" }}>Loading Enquiry list...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={{ padding: "30px", fontSize: "12px", marginLeft: "250px" }}>
            <div className="d-flex align-items-center justify-content-start gap-2 mb-4">
                <Link to='/staff/create-enquiry' className="add-badge" style={{ marginLeft: "0px", textDecoration: 'none' }}> <span>New Enquiry</span> <i class='bx  bxs-plus' style={{ color: '#ffffff' }}  ></i> </Link>
            </div>
            {/* Scrollable Table Container */}
            <div
                style={{
                    maxHeight: "400px", // 👈 Set the height limit
                    overflowY: "auto",   // 👈 Enables vertical scroll
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "transparent",
                        color: "white",
                    }}
                >
                    <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 2 }}>
                        <tr>
                            <th style={thStyle}>Id</th>
                            <th style={thStyle}>Student Name</th>
                            <th style={thStyle}>Mobile Number</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Enquiry Date</th>
                            <th style={thStyle}>Enquiry Status</th>
                            <th style={thStyle}>Details</th>
                            <th style={thStyle}>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {enquiryList.length > 0 ? (
                            enquiryList.map((enquiry, index) => (
                                <tr key={enquiry.id || index}>
                                    <td style={tdStyle}>{index + 1}</td>
                                    <td style={tdStyle}>{enquiry.student_name}</td>
                                    <td style={tdStyle}>{enquiry.mobile}</td>
                                    <td style={tdStyle}>{enquiry.email}</td>
                                    <td style={tdStyle}>{enquiry.enquiry_date}</td>
                                    <td style={tdStyle}>{enquiry.enquiry_status_display}</td>
                                    <td style={tdStyle}>
                                        <Link
                                            to={`/staff/student/enquiry/details/${enquiry.id}`}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#0d2d84ff",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            Click Here
                                        </Link>
                                    </td>
                                    <td style={tdStyle}>
                                        <Link
                                            to={`/staff/student/enquiry/update/${enquiry.id}`}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "green",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            <i className="bx bx-sm bx-pencil"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" style={{ textAlign: "center", padding: "10px" }}>
                                    No Enquiry found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

// table cell styles
const thStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontWeight: "600",
    color: "#092847ff",
    backgroundColor: "#f8f9fa",
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    color: "#092847ff",
};
