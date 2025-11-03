import { Link } from "react-router-dom";

export default function AdminRoles() {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/admin/create-staff'>Create Staff</Link>
        <Link to='/admin/show/staff-list'>Show Staff List</Link>
      </div>
    </>
  );
}
