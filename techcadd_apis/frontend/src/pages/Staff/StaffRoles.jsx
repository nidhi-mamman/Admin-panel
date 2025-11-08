import { Link } from "react-router-dom";

export default function StaffRoles() {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/staff/create-enquiry' className="submit-btn" style={{padding:"20px",fontSize:'10px'}}>Create Enquiry</Link>
        <Link to='/staff/student/create' className="submit-btn" style={{padding:"20px",fontSize:'10px'}}>Student Registration</Link>
        <Link to='/staff/show/enquiry-list' className="submit-btn" style={{padding:"20px",fontSize:'10px'}}>Show Enquiry List</Link>
        <Link to='/staff/show/registration-list' className="submit-btn" style={{padding:"20px",fontSize:'10px'}}>Show Registration List</Link>
      </div>
    </>
  );
}
