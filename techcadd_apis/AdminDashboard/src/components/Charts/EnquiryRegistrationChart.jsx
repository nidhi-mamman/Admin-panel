import { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { context } from "../../context/Authprovider";

// Chart.js imports
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

// Utility: Convert API created_at into month counts
function getMonthlyCounts(items) {
  const counts = Array(12).fill(0);

  items.forEach((item) => {
    if (item.created_at) {
      const month = new Date(item.created_at).getMonth();
      counts[month]++;
    }
  });

  return counts;
}

export default function EnquiryRegistrationChart() {
  const { authFetch } = useContext(context);

  const [monthlyEnquiries, setMonthlyEnquiries] = useState(Array(12).fill(0));
  const [monthlyRegistrations, setMonthlyRegistrations] = useState(
    Array(12).fill(0)
  );

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // 🔹 Enquiries
        const enquiryRes = await authFetch(
          "http://localhost:8000/api/staff/students/list/"
        );
        const enquiryData = await enquiryRes.json();
        setMonthlyEnquiries(
          getMonthlyCounts(enquiryData.students || [])
        );

        // 🔹 Registrations
        const regRes = await authFetch(
          "http://localhost:8000/api/staff/registrations/list/"
        );
        const regData = await regRes.json();
        setMonthlyRegistrations(
          getMonthlyCounts(regData.registrations || [])
        );

      } catch (error) {
        console.error("Chart Fetch Error:", error);
      }
    };

    fetchChartData();
  }, []);

  // Chart.js Data
  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Enquiries",
        data: monthlyEnquiries,
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.4,
      },
      {
        label: "Registrations",
        data: monthlyRegistrations,
        borderColor: "orange",
        backgroundColor: "orange",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
