import AdminNavbar from "../pages/Admin/AdminNavbar";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
