import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { Link } from "react-router-dom";

export default function RegistrationList() {
    const { token } = useContext(context);
    const [registrationList, setRegistrationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Reusable fetch function
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
            console.log("Search Response:", data); // 🔍 debug line

            // supports both APIs (list and search)
            setRegistrationList(data.registrations || data.results || []);
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

    if (loading) return <p style={{ textAlign: "center" }}>Loading Registration list...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={{ padding: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registration List</h2>

                {/* ✅ Search Form */}
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by name, email, phone, reg no, father name"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    marginTop: "20px",
                }}
            >
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                        <th style={thStyle}>Id</th>
                        <th style={thStyle}>Registration No.</th>
                        <th style={thStyle}>Student Name</th>
                        <th style={thStyle}>Mobile Number</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Details</th>
                        <th style={thStyle}>Fee History</th>
                        <th style={thStyle}>Update</th>
                    </tr>
                </thead>

                <tbody>
                    {registrationList.length > 0 ? (
                        registrationList.map((registration, index) => (
                            <tr key={registration.id || index}>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{registration.registration_number}</td>
                                <td style={tdStyle}>{registration.student_name}</td>
                                <td style={tdStyle}>{registration.phone_no}</td>
                                <td style={tdStyle}>{registration.email}</td>
                                <td style={tdStyle}>
                                    <Link
                                        to={`/staff/student/registration/details/${registration.id}`}
                                        style={{ color: "blue", textDecoration: "underline", background: "none", boxShadow: "none" }}
                                    >
                                        Click Here
                                    </Link>
                                </td>
                                <td style={tdStyle}>
                                    <Link
                                        to='/staff/fee-history'
                                        state={{registrationNumber:registration.registration_number}}
                                        style={{ color: "blue", background: "none", boxShadow: "none" }}
                                    >
                                       <i class='bx bx-sm  bx-history' ></i> 
                                    </Link>
                                </td>
                                <td style={tdStyle}>
                                    {Number(registration.total_course_fee) !== Number(registration.paid_fee) ? (
                                        <Link
                                            to="/staff/update-fee"
                                            state={{ registrationNumber: registration.registration_number }}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                boxShadow: "none",
                                                color: "green",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            <i className="bx bx-sm bx-pencil"></i>
                                        </Link>
                                    ) : (
                                        <span style={{ color: "gray" }}>Paid</span>
                                    )}
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                No Registration found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// table cell styles
const thStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#f8f9fa",
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
};
