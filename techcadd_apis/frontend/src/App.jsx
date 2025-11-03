import Home from './pages/Home'
import Staff from './pages/Staff/Staff'
import Student from './pages/Student/Students'
import Admin from './pages/Admin/Admin'
import { Routes, Route } from 'react-router-dom';
import CreateStaff from './pages/Admin/CreateStaff';
import EnquiryCreation from './pages/Staff/EnquiryCreation';
import StaffRoles from './pages/Staff/StaffRoles';
import StudentRegistration from './pages/Staff/StudentRegistration';
import Navbar from './components/Navbar';
import StaffList from './pages/Staff/StaffList';
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
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/roles' element={<AdminRoles />} />
        <Route path='/admin/create-staff' element={<CreateStaff />} />
        <Route path='/admin/show/staff-list' element={<StaffList />} />
        <Route path='/staff' element={<Staff />} />
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
        <Route path='/student' element={<Student />} />
        <Route path='/staff/student/create' element={<StudentRegistration />} />
      </Routes>
    </div>
  );
}
