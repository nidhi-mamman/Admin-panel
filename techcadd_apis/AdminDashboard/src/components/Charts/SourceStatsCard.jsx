import { useEffect, useState, useContext } from "react";
import { context } from "../../context/Authprovider";

export default function SourceStatsCard() {
  const { token } = useContext(context);

  const sources = [
    "Social Media",
    "Just Dial",
    "Random Call",
    "Direct Visit",
    "Banner",
    "Website",
    "Reference",
    "Newspaper",
    "Friend Reference",
    "Google Search",
  ];

  const [sourceCounts, setSourceCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch enquiries
        const enquiryRes = await fetch(
          "http://localhost:8000/api/staff/students/list/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const enquiryData = await enquiryRes.json();

        // Fetch registrations
        const regRes = await fetch(
          "http://localhost:8000/api/staff/registrations/list/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const regData = await regRes.json();

        // Calculate counts per source
        const counts = {};
        sources.forEach((source) => {
          const enquiryCount = (enquiryData.students || []).filter(
            (e) => e.source === source
          ).length;

          const regCount = (regData.registrations || []).filter(
            (r) => r.source === source
          ).length;

          counts[source] = { enquiries: enquiryCount, registrations: regCount };
        });

        setSourceCounts(counts);
      } catch (error) {
        console.error("Error fetching source stats:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {sources.map((source) => (
        <div
          key={source}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div>{source}</div>
          <div>
            Enquiries: {sourceCounts[source]?.enquiries || 0} | Registrations:{" "}
            {sourceCounts[source]?.registrations || 0}
          </div>
        </div>
      ))}
    </div>
  );
}
