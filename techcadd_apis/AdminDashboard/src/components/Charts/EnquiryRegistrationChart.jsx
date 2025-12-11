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
            const month = new Date(item.created_at).getMonth(); // 0 = January
            counts[month]++;
        }
    });

    return counts;
}

export default function EnquiryRegistrationChart() {
    const { token } = useContext(context);

    const [monthlyEnquiries, setMonthlyEnquiries] = useState(Array(12).fill(0));
    const [monthlyRegistrations, setMonthlyRegistrations] = useState(
        Array(12).fill(0)
    );

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // === Fetch Enquiries ===
                const enquiryRes = await fetch(
                    "http://localhost:8000/api/staff/students/list/",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const enquiryData = await enquiryRes.json();
                setMonthlyEnquiries(getMonthlyCounts(enquiryData.students || []));

                // === Fetch Registrations ===
                const regRes = await fetch(
                    "http://localhost:8000/api/staff/registrations/list/",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
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
    }, [token]);

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
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,   // start from 0
                ticks: {
                    stepSize: 1,       // increment by 1
                    precision: 0,      // ensures whole numbers
                },
            },
        },
    };

    return (
        <div style={{ width: "100%"}}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}
