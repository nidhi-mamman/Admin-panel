import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function EnquiryUpdate() {
  const { id } = useParams();
  const { token } = useContext(context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    enquiry_status: "",
    remark: "",
    next_follow_up_date: "",
    course_fee_offer: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/staff/students/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch enquiry details");
        console.log("Enquiry ID from URL:", id);

        const data = await response.json();
        setFormData({
          enquiry_status: data.enquiry_status || "",
          remark: data.remark || "",
          next_follow_up_date: data.next_follow_up_date || "",
          course_fee_offer: data.course_fee_offer || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Error loading enquiry details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating enquiry...");

    try {
      const response = await fetch(`http://localhost:8000/api/staff/students/${id}/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update enquiry");

      setMessage("✅ Enquiry updated successfully!");
      setTimeout(() => navigate("/staff/show/enquiry-list"), 1500);
    } catch (err) {
      setMessage("❌ Error updating enquiry.");
    }
  };

  if (loading) return <p className="loading">Loading enquiry...</p>;

  return (
    <div className="update-container">
      <h2 className="update-title">Update Enquiry</h2>
      {message && (
        <p
          className={`update-message ${
            message.startsWith("✅") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Enquiry Status:</label>
          <select
            name="enquiry_status"
            value={formData.enquiry_status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            <option value="registration_done">Registration Done</option>
            <option value="visited">Visited</option>
            <option value="in_process">In Process</option>
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
            <option value="follow_up_required">Follow up required</option>
            <option value="admission_done">Admission done</option>
            <option value="course_completed">Course completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        <div className="form-group">
          <label>Remark:</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Next Follow-up Date:</label>
          <input
            type="date"
            name="next_follow_up_date"
            value={formData.next_follow_up_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Course Fee Offer:</label>
          <input
            type="number"
            name="course_fee_offer"
            value={formData.course_fee_offer}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-btn">
          Update Enquiry
        </button>
      </form>
    </div>
  );
}
