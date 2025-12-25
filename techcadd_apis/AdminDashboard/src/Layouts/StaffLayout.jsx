import StaffNavbar from "../pages/Staff/StaffNavbar";
import StaffSidebar from "../pages/Staff/StaffSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  return (
    <div className="admin-layout">
      <StaffNavbar toggleSidebar={toggleSidebar} />
      <div className="admin-body">
        <StaffSidebar isOpen={sidebarOpen} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}