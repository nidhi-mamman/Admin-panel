import StaffNavbar from "../components/StaffNavbar";
import StaffSidebar from "../components/StaffSidebar";
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
