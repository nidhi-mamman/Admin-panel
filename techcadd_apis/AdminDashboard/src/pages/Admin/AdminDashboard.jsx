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
      <div className='dashboard-container'>
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
            <img src={chart} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}