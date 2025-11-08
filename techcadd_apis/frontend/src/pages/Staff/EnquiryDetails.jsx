import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/Authprovider";

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
        setEnquiry(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEnquiryDetails();
  }, [id, token]);

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!enquiry) return <p style={{ textAlign: "center" }}>Loading enquiry details...</p>;

  return (
    <div className="enquiry-container">
      <h2 className="enquiry-title">Enquiry Details</h2>

      <div className="enquiry-card">
        <p><strong>Student Name:</strong> {enquiry.student_name}</p>
        <p><strong>Date of Birth:</strong> {enquiry.date_of_birth}</p>
        <p><strong>Qualification:</strong> {enquiry.qualification}</p>
        <p><strong>Work or College:</strong> {enquiry.work_college}</p>
        <p><strong>Mobile:</strong> {enquiry.mobile}</p>
        <p><strong>Email:</strong> {enquiry.email}</p>
        <p><strong>Address:</strong> {enquiry.address}</p>
        <p><strong>Centre:</strong> {enquiry.centre_display}</p>
        <p><strong>Batch Timing:</strong> {enquiry.batch_time}</p>
        <p><strong>Course Fee offered:</strong> {enquiry.course_fee_offer}</p>
        <p><strong>Interested Course:</strong> {enquiry.course_interested}</p>
        <p><strong>Trade:</strong> {enquiry.trade_display}</p>
        <p><strong>Enquiry Source:</strong> {enquiry.enquiry_source}</p>
        <p><strong>Enquiry Date:</strong> {enquiry.enquiry_date}</p>
        <p><strong>Status:</strong> {enquiry.enquiry_status_display}</p>
        <p><strong>Follow-up Date:</strong> {enquiry.next_follow_up_date}</p>
        <p><strong>Remarks:</strong> {enquiry.remark}</p>
        <p><strong>Enquiry Taken By:</strong> {enquiry.enquiry_taken_by_name}</p>
      </div>
    </div>
  );
}
