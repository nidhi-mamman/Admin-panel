import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("http://127.0.0.1:8000/api/student/lms/dashboard/", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data.dashboard);
        } else {
          setError(data.message || "Failed to fetch dashboard data ❌");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!dashboardData) return null;

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>🎓 Student Dashboard</h2>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Registration No:</strong> {dashboardData.registration_number}</p>
        <p><strong>Name:</strong> {dashboardData.student_name}</p>
        <p><strong>Branch:</strong> {dashboardData.branch_display}</p>
        <p><strong>Course:</strong> {dashboardData.course_name}</p>
        <p><strong>Course Type:</strong> {dashboardData.course_type_name}</p>
        <p><strong>Joining Date:</strong> {dashboardData.joining_date}</p>
        <p><strong>Completion Date:</strong> {dashboardData.course_completion_date}</p>
        <p><strong>Days Remaining:</strong> {dashboardData.days_remaining_to_complete}</p>
        <p><strong>Course Status:</strong> {dashboardData.course_status}</p>
        <p><strong>Total Fee:</strong> ₹{dashboardData.total_course_fee}</p>
        <p><strong>Paid Fee:</strong> ₹{dashboardData.paid_fee}</p>
        <p><strong>Fee Balance:</strong> ₹{dashboardData.fee_balance}</p>
        <p><strong>Payment %:</strong> {dashboardData.payment_percentage}%</p>
      </div>

      <hr />

      <h3>📊 Quick Stats</h3>
      <ul>
        <li>Total Courses: {dashboardData.quick_stats.total_courses}</li>
        <li>Completed Lessons: {dashboardData.quick_stats.completed_lessons}</li>
        <li>Upcoming Classes: {dashboardData.quick_stats.upcoming_classes}</li>
        <li>Pending Assignments: {dashboardData.quick_stats.pending_assignments}</li>
      </ul>
      <Link to='/student/mycourse'>My Course</Link>
    </div>
  );
}
