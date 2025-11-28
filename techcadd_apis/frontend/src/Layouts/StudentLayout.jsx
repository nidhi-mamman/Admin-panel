import StudentSidebar from "../components/StudentsSidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <>
      <div className="student-layout">
        <StudentSidebar />
        <div className="student-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
