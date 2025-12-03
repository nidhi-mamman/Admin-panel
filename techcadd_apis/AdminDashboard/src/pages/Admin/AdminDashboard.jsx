// import RegistrationsChart from '../../components/Charts/RegistrationsChart'
import chart from '../../assets/chart.png'
export default function AdminDashboard() {
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
      </div>
    </>
  );
}
