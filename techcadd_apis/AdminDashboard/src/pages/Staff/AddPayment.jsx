import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "../../context/Authprovider";
import styles from "./AddPayment.module.css";

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Add Payment</h2>
          {registrationNumber && (
            <p className={styles.registrationNumber}>
              Registration: {registrationNumber}
            </p>
          )}
        </div>

        <div className={styles.pendingAlert}>
          <span className={styles.pendingIcon}>🔴</span>
          <div>
            <p className={styles.pendingText}>Pending Payment</p>
            <p className={styles.pendingAmount}>₹{pendingAmount}</p>
          </div>
        </div>

        <div className={styles.content}>
          {message && (
            <div
              className={`${styles.message} ${
                message.startsWith("✅") ? styles.success : styles.error
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Amount <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter payment amount"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Payment Mode <span className={styles.required}>*</span>
              </label>
              <select
                name="payment_mode"
                value={formData.payment_mode}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Mode</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Transaction ID</label>
              <input
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleChange}
                className={styles.input}
                placeholder="Optional"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Remark <span className={styles.required}>*</span>
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Add payment remarks..."
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
