import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { context } from "../../context/Authprovider";

export default function FeeHistory() {
  const { token } = useContext(context);
  const location = useLocation();
  const registrationNumber = location.state?.registrationNumber;

  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!registrationNumber) return;

    const fetchFeeHistory = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/staff/registrations/fee-history/?registration_number=${registrationNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch fee history");

        const data = await response.json();
        console.log("Fee History Response:", data);
        setFeeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeHistory();
  }, [registrationNumber, token]);

  if (!registrationNumber)
    return <p style={{ textAlign: "center", color: "red" }}>No registration number provided</p>;

  if (loading) return <p style={{ textAlign: "center" }}>Loading fee history...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  if (!feeData)
    return <p style={{ textAlign: "center" }}>No fee history found for this registration.</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Fee History — {feeData.student_name} ({feeData.registration_number})
      </h2>

      {/* ✅ Fee Summary Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <p><strong>Total Course Fee:</strong> ₹{feeData.total_course_fee}</p>
          <p><strong>Total Paid:</strong> ₹{feeData.total_paid_fee}</p>
          <p><strong>Pending:</strong> ₹{feeData.fee_balance}</p>
        </div>
        <div style={cardStyle}>
          <p><strong>Payment %:</strong> {feeData.payment_percentage}%</p>
          <p><strong>Installments:</strong> {feeData.total_installments}</p>
          <p><strong>Status:</strong> 
            <span
              style={{
                color:
                  feeData.payment_status === "fully_paid"
                    ? "green"
                    : feeData.payment_status === "partially_paid"
                    ? "orange"
                    : "red",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              {feeData.payment_status.replace("_", " ")}
            </span>
          </p>
        </div>
      </div>

      {/* ✅ Payment History Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Installment</th>
            <th style={thStyle}>Amount (₹)</th>
            <th style={thStyle}>Payment Date</th>
            <th style={thStyle}>Mode</th>
            <th style={thStyle}>Received By</th>
            <th style={thStyle}>Remark</th>
          </tr>
        </thead>
        <tbody>
          {feeData.payment_history && feeData.payment_history.length > 0 ? (
            feeData.payment_history.map((p, index) => (
              <tr key={p.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{p.installment_number}</td>
                <td style={tdStyle}>{p.amount}</td>
                <td style={tdStyle}>{p.payment_date}</td>
                <td style={tdStyle}>{p.payment_mode_display}</td>
                <td style={tdStyle}>{p.received_by_name}</td>
                <td style={tdStyle}>{p.remark || "—"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={tdStyle} colSpan="7">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------ Styles ------------------------ */

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px 25px",
  backgroundColor: "#f8f9fa",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  minWidth: "250px",
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  fontWeight: "600",
  backgroundColor: "#f8f9fa",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  color:"#ffffff"
};
