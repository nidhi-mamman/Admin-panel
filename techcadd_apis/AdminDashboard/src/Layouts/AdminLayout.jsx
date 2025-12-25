import AdminNavbar from "../pages/Admin/AdminNavbar";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  return (
    <div className="admin-layout">
      <AdminNavbar toggleSidebar={toggleSidebar}/>
      <div className="admin-body">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
