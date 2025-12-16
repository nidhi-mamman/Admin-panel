import { useEffect, useState, useContext } from "react";
import { context } from "../../context/Authprovider";
import Chart from '../../components/Charts/EnquiryRegistrationChart';

export default function AdminDashboard() {
  const { authFetch } = useContext(context);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        // 🔹 Registrations
        const regRes = await authFetch(
          "http://localhost:8000/api/staff/registrations/list/"
        );
        const regData = await regRes.json();
        setTotalRegistrations(regData.count || 0);

        // 🔹 Enquiries
        const enquiryRes = await authFetch(
          "http://localhost:8000/api/staff/students/list/"
        );
        const enquiryData = await enquiryRes.json();
        setTotalEnquiries(enquiryData.count || 0);

      } catch (err) {
        console.error("Dashboard API error:", err);
      }
    };

    fetchDashboardCounts();
  }, []);

  return (
    <div style={{ marginLeft: "220px" }}>
      <div className="summary-container">
        <div className="summary-area">
          <div className="summary-header">
            <h4 className="summary-title">Today's Summary</h4>
          </div>

          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-icon icon-primary">
                <i className="bx bxs-bar-chart-square" />
              </div>
              <h4>{totalEnquiries}</h4>
              <p className="summary-label">Total Enquiries</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon icon-secondary">
                <i className="bx bxs-file-detail" />
              </div>
              <h4>{totalRegistrations}</h4>
              <p className="summary-label">Total Registrations</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon icon-tertiary">
                <i className="bx bxs-price-tag" />
              </div>
              <h4>₹1k</h4>
              <p className="summary-label">Total Fees</p>
            </div>
          </div>
        </div>

        <div className="summary-chart">
          <Chart />
        </div>
      </div>
    </div>
  );
}
