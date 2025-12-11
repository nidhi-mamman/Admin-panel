import { useEffect, useState, useContext } from "react";
import { context } from "../../context/Authprovider";
import Chart from '../../components/Charts/EnquiryRegistrationChart'
// import SourceStatsCard from "../../components/Charts/SourceStatsCard";
export default function AdminDashboard() {
  const { token } = useContext(context);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/staff/registrations/list/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("Fetch Registrations Response:", data);

        setTotalRegistrations(data.count || 0);

      } catch (error) {
        console.error("Error fetching registration count:", error);
      }
    };

    fetchRegistrationCount();
  }, [token]);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        // Fetch Registrations Count
        const regRes = await fetch("http://localhost:8000/api/staff/registrations/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const regData = await regRes.json();
        setTotalRegistrations(regData.count || 0);

        // Fetch Enquiries Count
        const enquiryRes = await fetch("http://localhost:8000/api/staff/students/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const enquiryData = await enquiryRes.json();
        setTotalEnquiries(enquiryData.count || 0);

      } catch (err) {
        console.error("Dashboard API error:", err);
      }
    };

    fetchDashboardCounts();
  }, [token]);

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
                <h4>{totalEnquiries}</h4>
                <p className="summary-label">Total Enquiries</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon icon-secondary">
                  <i className='bx bxs-file-detail' style={{ color: '#f4f6ff' }}></i>
                </div>
                <h4>{totalRegistrations}</h4>
                <p className="summary-label">Total Registrations</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon icon-tertiary">
                  <i class='bx bxs-price-tag' style={{ color: '#f4f6ff' }}></i>                 </div>
                <h4>$1k</h4>
                <p className="summary-label">Total Fees</p>
              </div>
            </div>
          </div>
          <div className="summary-chart">
            <Chart />
            {/* <SourceStatsCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}
