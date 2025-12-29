import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { context } from "../../context/Authprovider";
import Chart from "../../components/Charts/EnquiryRegistrationChart";

export default function BranchDashboard() {
  const { authFetch, isLoggedin } = useContext(context);
  const navigate = useNavigate();

  const [todayEnquiries, setTodayEnquiries] = useState(0);
  const [todayRegistrations, setTodayRegistrations] = useState(0);
  const [todayPaidFees, setTodayPaidFees] = useState(0);

  const [todayFollowUps, setTodayFollowUps] = useState(0);
  const [upcomingFollowUps, setUpcomingFollowUps] = useState(0);
  const [overdueFollowUps, setOverdueFollowUps] = useState(0);

  /* ===============================
     🔐 Redirect immediately on logout
  =============================== */
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/", { replace: true });
    }
  }, [isLoggedin, navigate]);

  /* ===============================
     📊 Dashboard API Calls
  =============================== */
  useEffect(() => {
    if (!isLoggedin) return; // ⛔ STOP API calls if logged out

    const fetchDashboardCounts = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        /* ===== REGISTRATIONS ===== */
        const regRes = await authFetch(
          "http://localhost:8000/api/staff/registrations/list/"
        );

        if (!regRes.ok) return;

        const regData = await regRes.json();

        const todaysRegistrations = regData.registrations.filter(
          reg => reg.joining_date === today
        );

        setTodayRegistrations(todaysRegistrations.length);

        const totalFeesToday = todaysRegistrations.reduce(
          (sum, reg) => sum + Number(reg.paid_fee || 0),
          0
        );

        setTodayPaidFees(totalFeesToday);

        /* ===== ENQUIRIES + FOLLOW-UPS ===== */
        const enquiryRes = await authFetch(
          "http://localhost:8000/api/staff/students/list/"
        );

        if (!enquiryRes.ok) return;

        const enquiryData = await enquiryRes.json();

        const todaysEnquiries = enquiryData.students.filter(
          e => e.created_at?.split("T")[0] === today
        );

        setTodayEnquiries(todaysEnquiries.length);

        const validFollowUps = enquiryData.students.filter(
          s => s.next_follow_up_date && s.enquiry_status !== "converted"
        );

        setTodayFollowUps(
          validFollowUps.filter(s => s.next_follow_up_date === today).length
        );

        setUpcomingFollowUps(
          validFollowUps.filter(s => s.next_follow_up_date > today).length
        );

        setOverdueFollowUps(
          validFollowUps.filter(s => s.next_follow_up_date < today).length
        );
      } catch (err) {
        console.error("Dashboard API error:", err);
      }
    };

    fetchDashboardCounts();
  }, [authFetch, isLoggedin]);

  return (
    <div className="dashboard-container">
      {/* ===== TODAY SUMMARY ===== */}
      <div className="summary-container">
        <div className="summary-area">
          <div className="summary-header">
            <h4 className="summary-title">Today's Summary</h4>
          </div>

          <div className="summary-cards">
            <div className="summary-card">
              <h4>{todayEnquiries}</h4>
              <p>Enquiries</p>
            </div>

            <div className="summary-card">
              <h4>{todayRegistrations}</h4>
              <p>Registrations</p>
            </div>

            <div className="summary-card">
              <h4>₹{todayPaidFees.toLocaleString("en-IN")}</h4>
              <p>Paid Fees</p>
            </div>
          </div>
        </div>

        <div className="summary-chart">
          <Chart />
        </div>
      </div>

      {/* ===== FOLLOW-UP HIGHLIGHTS ===== */}
      <div className="summary-area" style={{ marginLeft: "20px" }}>
        <div className="summary-cards">
          <div className="summary-card followup-today">
            <h4>{todayFollowUps}</h4>
            <p>Follow-ups Today</p>
          </div>

          <div className="summary-card followup-upcoming">
            <h4>{upcomingFollowUps}</h4>
            <p>Upcoming Follow-ups</p>
          </div>

          <div className="summary-card followup-overdue">
            <h4>{overdueFollowUps}</h4>
            <p>Overdue Follow-ups</p>
          </div>
        </div>
      </div>
    </div >
  );
}
