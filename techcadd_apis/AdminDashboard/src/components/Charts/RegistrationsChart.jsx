import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { context } from '../../context/Authprovider'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RegistrationsChart() {
  const { token } = useContext(context);

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/staff/registrations/list/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("CHART API DATA:", data);

      const registrations =
        data.registrations ||
        data.results ||
        data.data ||
        [];

      processData(registrations);
    } catch (error) {
      console.error("Chart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRegistrations();
    }
  }, [token]);

  // 🔥 DYNAMIC MONTH + YEAR PROCESSING
  const processData = (list) => {
    if (!Array.isArray(list)) {
      console.error("Registrations is not an array:", list);
      return;
    }

    if (list.length === 0) {
      setChartData(null);
      return;
    }

    // 1️⃣ Detect available years from created_at
    const years = list.map((item) => new Date(item.created_at).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // 2️⃣ Create complete month list for all years
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const allMonths = [];
    for (let y = minYear; y <= maxYear; y++) {
      monthNames.forEach((m) => {
        allMonths.push(`${m} ${y}`);
      });
    }

    // 3️⃣ Initialize month counts to 0
    const monthCounts = {};
    allMonths.forEach((m) => (monthCounts[m] = 0));

    // 4️⃣ Count registrations by month
    list.forEach((item) => {
      const date = new Date(item.created_at);
      const month = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (monthCounts[month] !== undefined) {
        monthCounts[month] += 1;
      }
    });

    // 5️⃣ Prepare graph data
    const values = allMonths.map((m) => monthCounts[m]);

    setChartData({
      labels: allMonths,
      datasets: [
        {
          label: "Registrations Per Month",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  return (
    <div style={{ width: "80%", margin: "auto",height:"400px" }}>
      <h2 className="text-xl font-bold mb-3">Registrations Per Month</h2>

      {loading ? (
        <p>Loading chart...</p>
      ) : chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,   // no decimals
                  stepSize: 1     // whole numbers only
                }
              },
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
