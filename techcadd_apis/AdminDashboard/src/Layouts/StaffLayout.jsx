import StaffNavbar from "../pages/Staff/StaffNavbar";
import StaffSidebar from "../pages/Staff/StaffSidebar";
import { Outlet } from "react-router-dom";

export default function StaffLayout() {
  return (
    <div className="admin-layout">
      <StaffNavbar />
      <div className="admin-body">
        <StaffSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
