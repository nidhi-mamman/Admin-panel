import StudentNavbar from "../pages/Student/StudentNavbar";
import { Outlet } from "react-router-dom";
import StudentsSidebar from "../pages/Student/StudentsSidebar";
export default function StudentLayout() {
  return (
    <div className="admin-layout">
      <StudentNavbar />
      <div className="admin-body">
        <StudentsSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
