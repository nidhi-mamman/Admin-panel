import { useEffect, useContext, useState } from "react";
import { context } from "../../context/Authprovider";

const AllEnquiries = () => {
  const { token } = useContext(context);

  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  /* 🔹 Fetch enquiries */
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/staff/branch/enquiries/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data)
        setEnquiries(data.enquiries || []);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    if (token) fetchEnquiries();
  }, [token]);

  /* 🔹 Pagination logic */
  const totalItems = enquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEnquiries = enquiries.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "30px" }} className="dashboard-container">
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8f9fb" }}>
            <tr>
              <th style={thStyle}>Id</th>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Mobile Number</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Enquiry Date</th>
              <th style={thStyle}>Enquiry Status</th>
              {/* <th style={thStyle}>Details</th>
              <th style={thStyle}>Update</th> */}
            </tr>
          </thead>

          <tbody>
            {paginatedEnquiries.length > 0 ? (
              paginatedEnquiries.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{startIndex + index + 1}</td>
                  <td style={tdStyle}>{item.student_name}</td>
                  <td style={tdStyle}>{item.mobile}</td>
                  <td style={tdStyle}>{item.email}</td>
                  <td style={tdStyle}>{item.created_at.split("T")[0]}</td>
                  <td style={tdStyle}>{item.enquiry_status}</td>
                  {/* <td style={tdStyle}>
                    <a href="#" style={{ color: "#3f51ff" }}>
                      Click Here
                    </a>
                  </td>
                  <td style={tdStyle}>✏️</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Footer */}
      {totalItems > 0 && (
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#555" }}>
            Showing {startIndex + 1}–
            {Math.min(endIndex, totalItems)} of {totalItems}
          </span>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={pageBtn}
            >
              ‹
            </button>

            <button style={{ ...pageBtn, background: "#5a5ee0", color: "#fff" }}>
              {currentPage}
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={pageBtn}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEnquiries;

/* 🔹 Styles */
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
    fontSize:"10px",
    color: "#092847ff",
    backgroundColor:"white"
};

const pageBtn = {
  border: "1px solid #ddd",
  background: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
