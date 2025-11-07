import { Link } from "react-router-dom";

export default function AdminRoles() {
  return (
    <>
    <div style={{marginTop:"200px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/admin/create-staff' className="submit-btn" style={
          {
            padding:"15px"
          }
        }>Create Staff</Link>
        <Link to='/admin/show/staff-list' className="submit-btn"  style={
          {
            padding:"15px"
          }}>Show Staff List</Link>
      </div>
    </div>
    </>
  );
}
