import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { context } from "../../context/Authprovider";
import styles from './RegistrationDetails.module.css';

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

  if (error) return <p className={styles.error}>{error}</p>;
  if (!registration) return <p className={styles.loading}>Loading registration details...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Student Registration Details</h2>
          <p>Complete information about the registered student</p>
        </div>

        <div className={styles.content}>
          {/* ===================== Personal Details ===================== */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>👤</span>
              Personal Details
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Student Name</span>
                <span className={styles.fieldValue}>{registration.student_name}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Father's Name</span>
                <span className={styles.fieldValue}>{registration.father_name}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Date of Birth</span>
                <span className={styles.fieldValue}>{registration.date_of_birth}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Qualification</span>
                <span className={styles.fieldValue}>{registration.qualification}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Work or College</span>
                <span className={styles.fieldValue}>{registration.work_college}</span>
              </div>
            </div>
          </div>

          {/* ===================== Contact Details ===================== */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📞</span>
              Contact Details
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <span className={styles.fieldValue}>{registration.email}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Contact Address</span>
                <span className={styles.fieldValue}>{registration.contact_address}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Phone Number</span>
                <span className={styles.fieldValue}>{registration.phone_no}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>WhatsApp Number</span>
                <span className={styles.fieldValue}>{registration.whatsapp_no}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Parent's Number</span>
                <span className={styles.fieldValue}>{registration.parents_no}</span>
              </div>
            </div>
          </div>

          {/* ===================== Course Details ===================== */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📚</span>
              Course Details
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Branch</span>
                <span className={styles.fieldValue}>{registration.branch}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Joining Date</span>
                <span className={styles.fieldValue}>{registration.joining_date}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Course Type</span>
                <span className={styles.fieldValue}>{registration.course_type}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Course</span>
                <span className={styles.fieldValue}>{registration.course}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Software Covered</span>
                <span className={styles.fieldValue}>{registration.software_covered}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Duration (Months)</span>
                <span className={styles.fieldValue}>{registration.duration_months}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Duration (Hours)</span>
                <span className={styles.fieldValue}>{registration.duration_hours}</span>
              </div>
            </div>
          </div>

          {/* ===================== Fee Details ===================== */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💳</span>
              Fee Details
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Total Course Fee</span>
                <span className={styles.fieldValue}>₹{registration.total_course_fee}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Paid Fee</span>
                <span className={styles.fieldValue}>₹{registration.paid_fee}</span>
              </div>
            </div>
          </div>

          {/* ===================== Action Buttons ===================== */}
          <div className={styles.buttonContainer}>
            {Number(registration.total_course_fee) !== Number(registration.paid_fee) && (
              <Link
                to="/staff/add-payment"
                state={{
                  registrationNumber: registration.registration_number,
                  totalCourseFee: registration.total_course_fee,
                  paidFee: registration.paid_fee,
                }}
                className={`${styles.button} ${styles.addPaymentBtn}`}
              >
                💰 Add Payment
              </Link>
            )}

            <Link
              to="/staff/certificate-status"
              state={{ registrationNumber: registration.registration_number }}
              className={`${styles.button} ${styles.certificateBtn}`}
            >
              🎓 Generate Certificate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
