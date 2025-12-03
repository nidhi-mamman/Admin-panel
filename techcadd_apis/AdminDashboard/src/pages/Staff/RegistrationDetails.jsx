import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function RegistrationDetails() {
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
  if (!registration) return <p style={{ textAlign: "center" }}>Loading registration details...</p>;

  return (
    <div className="details-container">
      <div className="enquiry-details-form">

        {/* ===================== Personal Details ===================== */}
        <div>
          <h5>Personal Details</h5>
          <div className="form-row">
            <p><strong>Student Name:</strong><br /> {registration.student_name}</p>
            <p><strong>Father's Name:</strong><br /> {registration.father_name}</p>
            <p><strong>Date of Birth:</strong><br /> {registration.date_of_birth}</p>
            <p><strong>Qualification:</strong><br /> {registration.qualification}</p>
            <p><strong>Work or College:</strong><br /> {registration.work_college}</p>
          </div>
        </div>

        {/* ===================== Contact Details ===================== */}
        <div>
          <h5>Contact Details</h5>
          <div className="form-row">
            <p><strong>Email:</strong><br /> {registration.email}</p>
            <p><strong>Contact Address:</strong><br /> {registration.contact_address}</p>
            <p><strong>Phone No:</strong><br /> {registration.phone_no}</p>
            <p><strong>Whatsapp No:</strong> <br />{registration.whatsapp_no}</p>
            <p><strong>Parent's No:</strong><br /> {registration.parents_no}</p>
          </div>
        </div>

        {/* ===================== Course Details ===================== */}
        <div>
          <h5>Course Details</h5>
          <div className="form-row">
            <p><strong>Branch:</strong> <br />{registration.branch}</p>
            <p><strong>Joining Date:</strong> <br />{registration.joining_date}</p>
            <p><strong>Course Type:</strong><br /> {registration.course_type}</p>
            <p><strong>Course:</strong><br /> {registration.course}</p>
          </div>

          <div className="form-row">
            <p><strong>Software Covered:</strong><br /> {registration.software_covered}</p>
            <p><strong>Duration (Months):</strong><br /> {registration.duration_months}</p>
            <p><strong>Duration (Hours):</strong><br /> {registration.duration_hours}</p>
          </div>
        </div>

        {/* ===================== Fee Details ===================== */}
        <div>
          <h5>Fee Details</h5>
          <div className="form-row">
            <p><strong>Total Course Fee:</strong><br /> ₹{registration.total_course_fee}</p>
            <p><strong>Paid Fee:</strong><br /> ₹{registration.paid_fee}</p>
          </div>
        </div>

        {/* ===================== Buttons ===================== */}
        <div className="form-row" style={{ marginTop: "20px" }}>
          {Number(registration.total_course_fee) !== Number(registration.paid_fee) && (
            <Link
              to="/staff/add-payment"
              state={{
                registrationNumber: registration.registration_number,
                totalCourseFee: registration.total_course_fee,
                paidFee: registration.paid_fee,
              }}
              className="reg-btn add-btn"
            >
              💰 Add Payment
            </Link>
          )}

          <Link
            to="/staff/certificate-status"
            state={{ registrationNumber: registration.registration_number }}
            className="reg-btn cert-btn"
          >
            🎓 Generate Certificate
          </Link>
        </div>

      </div>
    </div>
  );
}
