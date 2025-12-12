import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { Link } from "react-router-dom";

export default function RegistrationList() {
    const { token } = useContext(context);
    const [registrationList, setRegistrationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [options, setOptions] = useState(null);
    const [filters, setFilters] = useState({
        branch: "",
        course_type: ""
    });


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchRegistrations = async (query = "") => {
        setLoading(true);
        try {
            let url = "http://localhost:8000/api/staff/registrations/list/";

            if (query.trim() !== "") {
                url = `http://127.0.0.1:8000/api/staff/registrations/search/?q=${encodeURIComponent(query)}`;
            }

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch registration list");

            const data = await response.json();

            console.log("Fetch Registrations Response:", data);
            setRegistrationList(data.registrations || data.results || []);
            setCurrentPage(1); // Reset pagination on search
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [token]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRegistrations(searchQuery);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === "") {
            fetchRegistrations();
        }
    };
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


    // Pagination Logic
    const totalPages = Math.ceil(registrationList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = registrationList.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    };

    const buildQueryString = (filters) => {
        const query = new URLSearchParams();

        if (filters.branch) query.append("branch", filters.branch);
        if (filters.course_type) query.append("course_type", filters.course_type);

        return query.toString(); // "branch=jalandhar1&course_type=18"
    };
    const fetchFilteredRegistrations = async () => {
        try {
            const queryString = buildQueryString(filters);

            const response = await fetch(
                `http://127.0.0.1:8000/api/staff/registrations/list/?${queryString}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (!response.ok) throw new Error("Failed to fetch filtered data");

            const data = await response.json();
            setRegistrationList(data?.registrations || data?.results || []);
        } catch (error) {
            console.error("Error fetching:", error);
        }
    };

    useEffect(() => {
        fetchFilteredRegistrations()
    }, [filters]);


    if (loading) return <p style={{ textAlign: "center" }}>Loading Registration list...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!options) return <p>Loading form options...</p>;

    return (
        <div style={{ padding: "30px", fontSize: "12px", marginLeft: "250px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    gap: "20px"
                }}
            >
                <div className="d-flex align-items-center justify-content-start gap-2">
                    <Link to='/staff/student/create' className="add-badge" style={{ marginLeft: "0px", textDecoration: 'none' }}>
                        <span>New Student</span> <i className='bx bxs-plus' style={{ color: '#ffffff' }}></i>
                    </Link>
                </div>
                <select name="branch" required value={filters.branch}
                    onChange={(e) =>
                        setFilters({ ...filters, branch: e.target.value })
                    }>
                    <option value="">-- Select Branch --</option>
                    {options.branch_choices?.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <select name="course_type" required value={filters.course_type}
                    onChange={(e) =>
                        setFilters({ ...filters, course_type: e.target.value })
                    }>
                    <option value="">-- Select Course Type --</option>
                    {options.course_types?.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>

                {/* Search Form */}
                <form style={{ display: "flex", alignItems: "center", flexDirection: "row" }} onSubmit={handleSearch}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        title="Search by name, email, phone, reg no, father name"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>

            {/* Scrollable Table */}
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
                        color: "white",
                    }}
                >
                    <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 2 }}>
                        <tr>
                            <th style={thStyle}>Id</th>
                            <th style={thStyle}>Registration No.</th>
                            <th style={thStyle}>Student Name</th>
                            <th style={thStyle}>Mobile Number</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Details</th>
                            <th style={thStyle}>Fee History</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((registration, index) => (
                                <tr key={registration.id || index}>
                                    <td style={tdStyle}>{startIndex + index + 1}</td>
                                    <td style={tdStyle}>{registration.registration_number}</td>
                                    <td style={tdStyle}>{registration.student_name}</td>
                                    <td style={tdStyle}>{registration.phone_no}</td>
                                    <td style={tdStyle}>{registration.email}</td>
                                    <td style={tdStyle}>
                                        <Link
                                            to={`/staff/student/registration/details/${registration.id}`}
                                            style={{ color: "#1337acff", textDecoration: "underline" }}
                                        >
                                            Click Here
                                        </Link>
                                    </td>
                                    <td style={tdStyle}>
                                        <Link
                                            to="/staff/fee-history"
                                            state={{ registrationNumber: registration.registration_number }}
                                            style={{ color: "green" }}
                                        >
                                            <i className="bx bx-sm bx-history"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "10px", color: "#092847ff" }}>
                                    No Registration found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
                <span className="pagination-info">
                    Showing {registrationList.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, registrationList.length)} of {registrationList.length}
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
