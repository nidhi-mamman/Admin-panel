import { Link } from "react-router-dom";

export default function StaffRoles() {
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
        <Link to='/staff/create-enquiry'>Create Enquiry</Link>
        <Link to='/staff/student/create'>Student Registration</Link>
        <Link to='/staff/show/enquiry-list'>Show Enquiry List</Link>
        <Link to='/staff/show/registration-list'>Show Registration List</Link>
      </div>
    </>
  );
}
