import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import CreateStaff from './pages/Admin/CreateStaff';
import EnquiryCreation from './pages/Staff/EnquiryCreation';
import StaffRoles from './pages/Staff/StaffRoles';
import StudentRegistration from './pages/Staff/StudentRegistration';
import Navbar from './components/Navbar';
import StaffList from './pages/Admin/StaffList';
import AdminRoles from './pages/Admin/AdminRoles';
import EnquiryList from './pages/Staff/EnquiryList';
import EnquiryUpdate from './pages/Staff/EnquiryUpdate';
import EnquiryDetails from './pages/Staff/EnquiryDetails';
import RegistrationList from './pages/Staff/RegistrationList';
import RegistrationDetails from './pages/Staff/RegistrationDetails';
import AddPayment from './pages/Staff/AddPayment';
import UpdateFee from './pages/Staff/UpdateFee';
import FeeHistory from './pages/Staff/FeeHistory';
import CertificateStatus from './pages/Staff/CertificateStatus';
import StudentDashboard from './pages/Student/StudentDashboard';
import MyCourses from './pages/Student/MyCourses';
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/roles' element={<AdminRoles />} />
        <Route path='/admin/create-staff' element={<CreateStaff />} />
        <Route path='/admin/show/staff-list' element={<StaffList />} />
        <Route path='/staff/roles' element={<StaffRoles />} />
        <Route path='/staff/create-enquiry' element={<EnquiryCreation />} />
        <Route path='/staff/show/enquiry-list' element={<EnquiryList />} />
        <Route path='/staff/student/enquiry/details/:id' element={<EnquiryDetails />} />
        <Route path="/staff/student/enquiry/update/:id" element={<EnquiryUpdate />} />
        <Route path='/staff/show/registration-list' element={<RegistrationList />} />
        <Route path='/staff/student/registration/details/:id' element={<RegistrationDetails />} />
        <Route path="/staff/add-payment" element={<AddPayment />} />
        <Route path="/staff/update-fee" element={<UpdateFee />} />
        <Route path="/staff/fee-history" element={<FeeHistory />} />
        <Route path="/staff/certificate-status" element={<CertificateStatus />} />
        <Route path='/staff/student/create' element={<StudentRegistration />} />
        <Route path='/student/dashboard' element={<StudentDashboard />} />
        <Route path='/student/mycourse' element={<MyCourses/>}/>
      </Routes>
    </div>
  );
}
