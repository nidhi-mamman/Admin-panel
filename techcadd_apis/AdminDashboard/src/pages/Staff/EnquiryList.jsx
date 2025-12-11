import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { Link } from "react-router-dom";

export default function EnquiryList() {
    const { token } = useContext(context);
    const [enquiryList, setEnquiryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);
    const [filters, setFilters] = useState({
        centre: "",
        trade: "",
        enquiry_status: ""
    });


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
                console.log(data)
                setEnquiryList(data.students || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiry();
    }, [token]);


    // Pagination logic
    const totalPages = Math.ceil(enquiryList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = enquiryList.slice(startIndex, endIndex);

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };
    useEffect(() => {
        const fetchFilteredEnquiries = async () => {
            try {
                let query = [];

                if (filters.centre) query.push(`centre=${filters.centre}`);
                if (filters.trade) query.push(`trade=${filters.trade}`);
                if (filters.enquiry_status) query.push(`enquiry_status=${filters.enquiry_status}`);

                const queryString = query.length > 0 ? `?${query.join("&")}` : "";

                const response = await fetch(
                    `http://localhost:8000/api/staff/students/list/${queryString}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                console.log("Fetched Enquiries:", data);
                setEnquiryList(data.students || []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFilteredEnquiries();
    }, [filters, token]);

    if (loading) return <p style={{ textAlign: "center" }}>Loading Enquiry list...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    if (!options) return <p>Loading form options...</p>;


    return (
        <div style={{ padding: "30px", fontSize: "12px", marginLeft: "250px" }}>
            <div className="d-flex align-items-center justify-content-start gap-2 mb-5">
                <Link to='/staff/create-enquiry' className="add-badge" style={{ textDecoration: 'none' }}>
                    <span>New Enquiry</span>
                    <i className='bx bxs-plus' style={{ color: '#ffffff' }}></i>
                </Link>
                <select name="centre" required onChange={handleFilterChange}>
                    <option value="">-- Select Centre --</option>
                    {options.centre_choices.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <select name="trade" required onChange={handleFilterChange}>
                    <option value="">-- Select Trade --</option>
                    {options.trade_choices.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <select name="enquiry_status" required onChange={handleFilterChange}>
                    <option value="">-- Select Status --</option>
                    {options.enquiry_status_choices.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            {/* Scrollable Table Container */}
            <div
                style={{
                    maxHeight: "400px",
                    overflowY: "auto",
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
                        {currentItems.length > 0 ? (
                            currentItems.map((enquiry, index) => (
                                <tr key={enquiry.id || index}>
                                    <td style={tdStyle}>{startIndex + index + 1}</td>
                                    <td style={tdStyle}>{enquiry.student_name}</td>
                                    <td style={tdStyle}>{enquiry.mobile}</td>
                                    <td style={tdStyle}>{enquiry.email}</td>
                                    <td style={tdStyle}>{enquiry.created_at ? enquiry.created_at.split("T")[0] : ""}</td>
                                    <td style={tdStyle}>{enquiry.enquiry_status_display}</td>
                                    <td style={tdStyle}>
                                        <Link
                                            to={`/staff/student/enquiry/details/${enquiry.id}`}
                                            style={{
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
                                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                                    No Enquiry found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component (same as StaffList) */}
            <div className="pagination-container">
                <span className="pagination-info">
                    Showing {enquiryList.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(endIndex, enquiryList.length)} of {enquiryList.length}
                </span>

                <div className="pagination-controls">
                    <button
                        className="pagination-btn pagination-arrow"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>

                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="pagination-btn pagination-arrow"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}

// Styles
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
