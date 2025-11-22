import StudentSidebar from "../components/StudentsSidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <>
      <StudentSidebar />
      <Outlet />
    </>
  );
}
