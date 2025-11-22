import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import StaffLayout from "./Layouts/StaffLayout";
import StudentLayout from "./Layouts/StudentLayout";

// Admin pages
import CreateStaff from './pages/Admin/CreateStaff';
import StaffList from './pages/Admin/StaffList';

// Staff pages
import EnquiryCreation from './pages/Staff/EnquiryCreation';
import EnquiryList from './pages/Staff/EnquiryList';
import EnquiryUpdate from './pages/Staff/EnquiryUpdate';
import EnquiryDetails from './pages/Staff/EnquiryDetails';
import StudentRegistration from './pages/Staff/StudentRegistration';
import RegistrationList from './pages/Staff/RegistrationList';
import RegistrationDetails from './pages/Staff/RegistrationDetails';
import AddPayment from './pages/Staff/AddPayment';
import UpdateFee from './pages/Staff/UpdateFee';
import FeeHistory from './pages/Staff/FeeHistory';
import CertificateStatus from './pages/Staff/CertificateStatus';

// Student pages
import StudentDashboard from './pages/Student/StudentDashboard';
import MyCourses from './pages/Student/MyCourses';
import StaffDashboard from './pages/Staff/StaffDashboard';

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />

      {/* ---------- ADMIN ROUTES ---------- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="create-staff" element={<CreateStaff />} />
        <Route path="show/staff-list" element={<StaffList />} />
      </Route>

      {/* ---------- STAFF ROUTES ---------- */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="create-enquiry" element={<EnquiryCreation />} />
        <Route path="show/enquiry-list" element={<EnquiryList />} />
        <Route path="student/enquiry/details/:id" element={<EnquiryDetails />} />
        <Route path="student/enquiry/update/:id" element={<EnquiryUpdate />} />
        <Route path="show/registration-list" element={<RegistrationList />} />
        <Route path="student/registration/details/:id" element={<RegistrationDetails />} />
        <Route path="add-payment" element={<AddPayment />} />
        <Route path="update-fee" element={<UpdateFee />} />
        <Route path="fee-history" element={<FeeHistory />} />
        <Route path="certificate-status" element={<CertificateStatus />} />
        <Route path="student/create" element={<StudentRegistration />} />
      </Route>

      {/* ---------- STUDENT ROUTES ---------- */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="mycourse" element={<MyCourses />} />
      </Route>

    </Routes>
  );
}
