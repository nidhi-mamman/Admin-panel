import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/Authprovider";
import styles from "./EnquiryDetails.module.css";

export default function EnquiryDetails() {
  const { id } = useParams();
  const { token } = useContext(context);
  const [enquiry, setEnquiry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/staff/students/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch enquiry details");

        const data = await response.json();
        console.log("data:", data);
        setEnquiry(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEnquiryDetails();
  }, [id, token]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!enquiry) return <p className={styles.loading}>Loading enquiry details...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Student Enquiry Details</h2>
          <p>Complete information about the student enquiry</p>
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
                <span className={styles.fieldValue}>{enquiry.student_name}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Date of Birth</span>
                <span className={styles.fieldValue}>{enquiry.date_of_birth}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Qualification</span>
                <span className={styles.fieldValue}>{enquiry.qualification}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Work or College</span>
                <span className={styles.fieldValue}>{enquiry.student_type}</span>
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
                <span className={styles.fieldLabel}>Mobile</span>
                <span className={styles.fieldValue}>{enquiry.mobile}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <span className={styles.fieldValue}>{enquiry.email}</span>
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.fieldLabel}>Address</span>
                <span className={styles.fieldValue}>{enquiry.address}</span>
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
                <span className={styles.fieldLabel}>Centre</span>
                <span className={styles.fieldValue}>{enquiry.centre_display}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Batch Timing</span>
                <span className={styles.fieldValue}>{enquiry.batch_time}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Course Fee Offered</span>
                <span className={styles.fieldValue}>₹{enquiry.course_fee_offer}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Interested Course</span>
                <span className={styles.fieldValue}>{enquiry.course_interested}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Trade</span>
                <span className={styles.fieldValue}>{enquiry.trade_display}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Enquiry Source</span>
                <span className={styles.fieldValue}>{enquiry.enquiry_source}</span>
              </div>
            </div>
          </div>

          {/* ===================== Enquiry Status ===================== */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📋</span>
              Enquiry Status
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Enquiry Date</span>
                <span className={styles.fieldValue}>{enquiry.enquiry_date}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Status</span>
                <span className={styles.fieldValue}>{enquiry.enquiry_status_display}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Follow-up Date</span>
                <span className={styles.fieldValue}>{enquiry.next_follow_up_date}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Enquiry Taken By</span>
                <span className={styles.fieldValue}>{enquiry.enquiry_taken_by["first_name"]}</span>
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.fieldLabel}>Remarks</span>
                <span className={styles.fieldValue}>{enquiry.remark}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
