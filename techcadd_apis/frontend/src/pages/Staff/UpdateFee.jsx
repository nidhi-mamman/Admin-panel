import { useContext, useState } from "react";
import { context } from "../../context/Authprovider";
import { useLocation } from "react-router-dom";

export default function UpdateFee() {
  const { token } = useContext(context);
  const { state } = useLocation();
  const registrationNumber = state?.registrationNumber;

  const [paidFee, setPaidFee] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registrationNumber) {
      setMessage("Registration number missing.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/staff/registrations/update-fee/?registration_number=${registrationNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paid_fee: paidFee }),
        }
      );

      if (!response.ok) throw new Error("Failed to update fee");

      const data = await response.json();
      setMessage(data.message || "Fee updated successfully!");
      setPaidFee("");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update Fee for {registrationNumber || "Unknown Student"}
      </h2>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input
          type="number"
          name="paid_fee"
          id="paid_fee"
          value={paidFee}
          onChange={(e) => setPaidFee(e.target.value)}
          placeholder="Enter Paid Fee"
          required
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
            marginTop: "15px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
