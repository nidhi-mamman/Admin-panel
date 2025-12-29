import { Outlet } from "react-router-dom";
import { useState } from "react";
import BranchNavbar from "../pages/Staff/BranchNavbar";
import BranchSidebar from "../pages/Staff/BranchSidebar";

export default function BranchLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  return (
    <div className="admin-layout">
      <BranchNavbar toggleSidebar={toggleSidebar} />
      <div className="admin-body">
        <BranchSidebar isOpen={sidebarOpen} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}