export default function StaffDashboard() {
  return (
    <>
      <div style={{marginLeft: "300px" }}>
        <p style={{
          fontSize: "25px", fontWeight: 600, fontFamily: "Times New Roman"
        }}>Welcome to Staff Dashboard</p>
        <div className="cards-container">
          <div className="enquiry-count-card">
            <h3>Enquiries</h3>
            <span className="card-number">1
              50</span>  
          </div>
          <div className="registration-count-card">
            <h3>Registrations</h3>
            <span className="card-number">150</span>  
          </div>
           <div className="enquiry-count-card">
            <h3>Enquiries</h3>
            <span className="card-number">1
              50</span>  
          </div>
          <div className="registration-count-card">
            <h3>Registrations</h3>
            <span className="card-number">150</span>  
          </div>
          <p style={{
            color:"grey"
          }}>***Here we will show the statistics later on</p>
        </div>
      </div>
    </>
  );
}
