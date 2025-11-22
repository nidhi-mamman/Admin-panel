import { useContext, useEffect, useState } from "react";
import { context } from "../../context/Authprovider";
import { Link, useLocation } from "react-router-dom";

export default function StaffList() {
  const { token } = useContext(context);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/staff/list/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading staff list...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <div className="d-flex align-items-center justify-content-start gap-2 mb-4">
        <Link to='/admin/create-staff' className="add-badge" style={{marginLeft:"0px",textDecoration:'none'}}> <span>Add Staff</span> <i class='bx  bxs-plus'  style={{color:'#ffffff'}}  ></i> </Link>
      </div>

      {/* Scrollable container */}
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
              <th style={thStyle}>Id</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Active</th>
              <th style={thStyle}>Created At</th>
            </tr>
          </thead>

          <tbody style={{ backgroundColor: "#fff", color: "#000" }}>
            {staffList.length > 0 ? (
              staffList.map((staff, index) => (
                <tr key={staff.id || index}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{staff.username}</td>
                  <td style={tdStyle}>{staff.first_name}</td>
                  <td style={tdStyle}>{staff.last_name}</td>
                  <td style={tdStyle}>{staff.email}</td>
                  <td style={tdStyle}>{staff.role}</td>
                  <td style={tdStyle}>{staff.department}</td>
                  <td style={tdStyle}>{staff.phone}</td>
                  <td style={tdStyle}>{staff.address}</td>
                  <td style={tdStyle}>{staff.is_active ? "Yes" : "No"}</td>
                  <td style={tdStyle}>{new Date(staff.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "10px" }}>
                  No staff found
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
  fontSize: "14px",
  backgroundColor: "#f8f9fa",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  color: "#092847ff",
  fontSize: "12px",
};
