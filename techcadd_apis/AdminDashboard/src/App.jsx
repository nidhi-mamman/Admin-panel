import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import StaffLayout from "./Layouts/StaffLayout";
import StudentLayout from "./Layouts/StudentLayout";
import BranchLayout from './Layouts/BranchLayout';

// Admin pages
import CreateStaff from './pages/Admin/CreateStaff';
import StaffList from './pages/Admin/StaffList';
import CreateBranch from './pages/Admin/CreateBranch';
import BranchList from './pages/Admin/BranchList';

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
import StaffDashboard from './pages/Staff/StaffDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentProfile from './pages/Student/StudentProfile';
import MyCourses from './pages/Student/MyCourses';
import ScrollToTop from './pages/ScrollToTop';
import BranchDashboard from './pages/Staff/BranchDashboard';
import AllEnquiries from './pages/Staff/AllEnquiries';
import AllRegistrations from './pages/Staff/AllRegistrations'
import StaffLogin from './pages/Staff/StaffLogin';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="create-branch" element={<CreateBranch />} />
          <Route path="show/staff-list" element={<StaffList />} />
          <Route path="show/branch-list" element={<BranchList />} />
        </Route>

        {/* ---------- STAFF ROUTES ---------- */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="Login" element={<StaffLogin/>} />
          <Route path="staff-dashboard" element={<StaffDashboard />} />
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

        {/* ---------- BRANCH ROUTES ---------- */}
        <Route path="/branch" element={<BranchLayout />}>
          <Route path="dashboard" element={<BranchDashboard />} />
          <Route path="show/enquiries" element={<AllEnquiries />} />
          <Route path="show/registrations" element={<AllRegistrations />} />
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
          <Route path="profile" element={<StudentProfile />} />
          <Route path="mycourses" element={<MyCourses />} />
        </Route>
      </Routes>
    </>
  );
}
