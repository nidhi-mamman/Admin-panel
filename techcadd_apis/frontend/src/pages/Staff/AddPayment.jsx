import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function AddPayment() {
  const { token } = useContext(context);
  const navigate = useNavigate();
  const location = useLocation();

  const registrationNumber = location.state?.registrationNumber;
  const totalCourseFee = Number(location.state?.totalCourseFee || 0);
  const paidFee = Number(location.state?.paidFee || 0);
  const pendingAmount = totalCourseFee - paidFee;

  useEffect(() => {
    if (!registrationNumber) {
      alert("Invalid access. Please open from registration details page.");
      navigate(-1);
    }
  }, [registrationNumber, navigate]);

  const [formData, setFormData] = useState({
    amount: "",
    payment_mode: "",
    transaction_id: "",
    remark: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/staff/registrations/add-payment/?registration_number=${registrationNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to add payment");

      setMessage("✅ Payment added successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Add Payment {registrationNumber && `for ${registrationNumber}`}</h2>

        <p className="pending-text">🔴 Pending Payment: ₹{pendingAmount}</p>

        {message && (
          <p
            className={`message ${
              message.startsWith("✅") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Payment Mode</label>
          <select
            name="payment_mode"
            value={formData.payment_mode}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>

          <label>Transaction ID</label>
          <input
            type="text"
            name="transaction_id"
            value={formData.transaction_id}
            onChange={handleChange}
            placeholder="Optional"
          />

          <label>Remark</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            rows="3"
            required
          />

          <button type="submit">Submit Payment</button>
        </form>
      </div>
    </div>
  );
}
