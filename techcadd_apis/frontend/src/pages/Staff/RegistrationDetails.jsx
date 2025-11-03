import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function EnquiryDetails() {
  const { id } = useParams();
  const { token } = useContext(context);
  const [registration, setRegistration] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/staff/registrations/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch registration details");

        const data = await response.json();
        setRegistration(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRegistrationDetails();
  }, [id, token]);

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!registration) return <p style={{ textAlign: "center" }}>Loading Registration details...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h2>Registration Details</h2>
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
        <p><strong>Branch:</strong> {registration.branch}</p>
        <p><strong>Joining Date:</strong> {registration.joining_date}</p>
        <p><strong>Student Name:</strong> {registration.student_name}</p>
        <p><strong>Father's Name:</strong> {registration.father_name}</p>
        <p><strong>Date of Birth:</strong> {registration.date_of_birth}</p>
        <p><strong>Email:</strong> {registration.email}</p>
        <p><strong>Qualification:</strong> {registration.qualification}</p>
        <p><strong>Work or College:</strong> {registration.work_college}</p>
        <p><strong>Contact Address:</strong> {registration.contact_address}</p>
        <p><strong>Phone No:</strong> {registration.phone_no}</p>
        <p><strong>Whatsapp No:</strong> {registration.whatsapp_no}</p>
        <p><strong>Parent's No:</strong> {registration.parents_no}</p>
        <p><strong>Course Type:</strong> {registration.course_type}</p>
        <p><strong>Course:</strong> {registration.course}</p>
        <p><strong>Software's Covered:</strong> {registration.software_covered}</p>
        <p><strong>Duration Months:</strong> {registration.duration_months}</p>
        <p><strong>Duration Hours:</strong> {registration.duration_hours}</p>
        <p><strong>Total Course Fee:</strong> ₹{registration.total_course_fee}</p>
        <p><strong>Paid Fee:</strong> ₹{registration.paid_fee}</p>

        {Number(registration.total_course_fee) !== Number(registration.paid_fee) && (
          <p><Link
            to="/staff/add-payment"
            state={{
              registrationNumber: registration.registration_number,
              totalCourseFee: registration.total_course_fee,
              paidFee: registration.paid_fee,
            }}
          >
            Add Payment
          </Link></p>
        )}
        <Link
          to="/staff/certificate-status"
          state={{ registrationNumber: registration.registration_number }}
          style={{ color: "blue", background: "none", boxShadow: "none" }}
        >
          <i className="bx bx-sm bx-certification"></i> Generate Certificate
        </Link>

      </div>
    </div>
  );
}
