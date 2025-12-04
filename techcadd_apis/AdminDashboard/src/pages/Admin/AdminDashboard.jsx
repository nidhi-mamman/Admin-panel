// import RegistrationsChart from '../../components/Charts/RegistrationsChart'
import chart from '../../assets/chart.png'
import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
    const { authFetch, isLoggedin } = useContext(context);
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
  
    useEffect(() => {
      const fetchStaff = async () => {
        // Skip fetch if not logged in
        if (!isLoggedin) {
          setLoading(false);
          return;
        }

        try {
          const response = await authFetch("http://localhost:8000/api/admin/staff/list/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.status === 401) {
            // Token invalid/expired and refresh failed — redirect to login
            navigate("/");
            return;
          }

          if (!response.ok) throw new Error("Failed to fetch staff list");
  
          const data = await response.json();
          setStaffList(data.staff_list || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStaff();
    }, [authFetch, isLoggedin, navigate]);
  
    if (loading) return <p style={{ textAlign: "center" }}>Loading staff list...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    // Pagination calculations
    const totalPages = Math.ceil(staffList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStaff = staffList.slice(startIndex, endIndex);

    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    };

    // Badge style helper for roles - dark text + light gradient background
    const getRoleBadgeStyle = (role) => {
      const baseStyle = {
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "700",
      };

      const roleKey = (role || "").toString().toLowerCase();
      const roleMap = {
        manager: { color: "#2b8a3e", background: "linear-gradient(135deg,#ecfff1,#d6ffd6)" },
        trainer: { color: "#b35a00", background: "linear-gradient(135deg,#fff6ea,#ffe8cf)" },
        counselor: { color: "#1f6fd6", background: "linear-gradient(135deg,#e6f4ff,#dbefff)" },
      };

      const chosen = roleMap[roleKey] || { color: "#444", background: "linear-gradient(135deg,#f3f4f6,#e6e7ea)" };
      return { ...baseStyle, color: chosen.color, background: chosen.background };
    };

    // Badge style helper for active status - dark text + light gradient
    const getActiveBadgeStyle = (isActive) => {
      const baseStyle = {
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "700",
      };

      if (isActive) {
        return { ...baseStyle, color: "#2b8a3e", background: "linear-gradient(135deg,#ecfff1,#d6ffd6)" };
      }
      return { ...baseStyle, color: "#a21919", background: "linear-gradient(135deg,#fff1f2,#ffd6d8)" };
    };
  
  return (
    <>
      <div style={{ marginLeft: "220px" }}>
        <div className="summary-container">
          <div className="summary-area">
            <div className="summary-header">
              <div>
                <h4 className="summary-title">Today's Summary</h4>
              </div>
            </div>
            <div className="summary-cards">
              <div className="summary-card">
                <div className="summary-icon icon-primary">
                  <i class='bx  bxs-bar-chart-square' style={{ color: '#f4f6ff' }}></i>                 </div>
                <h4>$1k</h4>
                <p className="summary-label">Total Sales</p>
                <p className="summary-change">Last day +8%</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon icon-secondary">
                  <i class='bx  bxs-file-detail' style={{ color: '#f4f6ff' }}></i>                </div>
                <h4>$1k</h4>
                <p className="summary-label">Total Sales</p>
                <p className="summary-change">Last day +8%</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon icon-tertiary">
                  <i class='bx bxs-price-tag' style={{ color: '#f4f6ff' }}></i>                 </div>
                <h4>$1k</h4>
                <p className="summary-label">Total Sales</p>
                <p className="summary-change">Last day +8%</p>
              </div>
            </div>
          </div>
          <div className="summary-chart">
            {/* <RegistrationsChart /> */}
            <img src={chart} alt="" />
          </div>
        </div>
        <div className="staff-list-container">
          <h4 style={{fontWeight:"600",fontSize:"20px"}} className='staff-list-header'>Staff Directory</h4>
           <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px",
          }}
        >
          <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Active</th>
            </tr>
          </thead>

          <tbody style={{ backgroundColor: "#fff", color: "#000" }}>
            {currentStaff.length > 0 ? (
              currentStaff.map((staff, index) => (
                <tr key={staff.id || index}>
                  <td style={tdStyle}>{staff.first_name} {staff.last_name}</td>
                  <td style={tdStyle}>
                    <span style={getRoleBadgeStyle(staff.role)}>
                      {staff.role}
                    </span>
                  </td>
                  <td style={tdStyle}>{staff.username}</td>
                  <td style={tdStyle}>{staff.department}</td>
                  <td style={tdStyle}>
                    <span style={getActiveBadgeStyle(staff.is_active)}>
                      {staff.is_active ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          <span className="pagination-info">
            Showing {staffList.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, staffList.length)} of {staffList.length}
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
      </div>
    </>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  fontWeight: "600",
  color: "#092847ff",
  fontSize: "12px",
  backgroundColor: "#f8f9fa",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  color: "#092847ff",
  fontSize: "9px",
};