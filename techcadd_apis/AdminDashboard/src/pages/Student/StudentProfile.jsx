import { useEffect, useState } from "react";
import profile from "../../assets/profilepic.jpg";

export default function StudentProfile() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
          "http://127.0.0.1:8000/api/student/lms/dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const progress = dashboardData.payment_percentage;
  const status = dashboardData.course_status;

  const getProgressColor = () => {
    if (progress < 40) return "#ef4444"; // red
    if (progress < 70) return "#f59e0b"; // orange
    return "#22c55e"; // green
  };

  const getStatusColor = () => {
    if (status === "completed") return "#22c55e";
    if (status === "ongoing") return "#3b82f6";
    return "#9ca3af"; // not_started
  };

  return (
    <div style={{ padding: "30px", marginLeft: "320px" }}>
      {/* ================= PROFILE CARD ================= */}
      <div
        style={{
          maxWidth: "450px",
          padding: "20px",
          marginBlock: "20px",
          marginLeft: "220px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={profile}
          alt="Profile"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div className="profile-data">
          <h2 style={{ marginBottom: "6px" }}>
            {dashboardData.student_name}
          </h2>
          <p>
            <strong>Registration No:</strong>{" "}
            {dashboardData.registration_number}
          </p>
          <p>
            <strong>Branch:</strong> {dashboardData.branch_display}
          </p>
        </div>
      </div>

      {/* ================= COURSE PROGRESS CARD ================= */}
      <div
        style={{
          maxWidth: "900px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "10px", textAlign: "center" }}>Course Progress</h3>

        <p style={{ color: "#4b5563", marginBottom: "10px" }}>
          {dashboardData.course_name} ({dashboardData.course_type_name})
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "12px",
            backgroundColor: "#e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: getProgressColor(),
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "14px",
            color: "#374151",
          }}
        >
          <span>{progress}% completed</span>
          <span>
            {dashboardData.days_remaining_to_complete} days remaining
          </span>
        </div>

        {/* Status Badge */}
        <span
          style={{
            display: "inline-block",
            padding: "5px 12px",
            fontSize: "12px",
            borderRadius: "20px",
            color: "#fff",
            backgroundColor: getStatusColor(),
          }}
        >
          {status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      {/* ================= FEE SUMMARY CARD ================= */}
      <div
        style={{
          maxWidth: "900px",
          padding: "20px",
          marginBlock: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "12px", textAlign: "center" }}>Fee Summary</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
            <p>Total Fee</p>
            <strong>₹{dashboardData.total_course_fee}</strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
            <p>Paid Fee</p>
            <strong style={{ color: "#16a34a" }}>
              ₹{dashboardData.paid_fee}
            </strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
            <p>Balance</p>
            <strong style={{ color: "#dc2626" }}>
              ₹{dashboardData.fee_balance}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
