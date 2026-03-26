import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentsChart = ({ latestAppointments }) => {
  // Group appointments by date
  const grouped = {};
  latestAppointments.forEach((a) => {
    const date = a.slotDate;
    if (!grouped[date]) grouped[date] = { total: 0, completed: 0, cancelled: 0 };
    grouped[date].total += 1;
    if (a.cancel) grouped[date].cancelled += 1;
    else grouped[date].completed += 1;
  });

  const labels = Object.keys(grouped);
  const totalData = Object.values(grouped).map((d) => d.total);
  const completedRate = Object.values(grouped).map((d) =>
    ((d.completed / d.total) * 100).toFixed(0)
  );
  const cancelledRate = Object.values(grouped).map((d) =>
    ((d.cancelled / d.total) * 100).toFixed(0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Appointments",
        data: totalData,
        borderColor: "rgba(99, 102, 241, 0.8)", // Indigo
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Completed Rate (%)",
        data: completedRate,
        borderColor: "rgba(16, 185, 129, 0.8)", // Green
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
        fill: true,
        yAxisID: "rateAxis",
      },
      {
        label: "Cancelled Rate (%)",
        data: cancelledRate,
        borderColor: "rgba(239, 68, 68, 0.8)", // Red
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.3,
        fill: true,
        yAxisID: "rateAxis",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Appointments & Rates" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Total Appointments" } },
      rateAxis: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        max: 100,
        ticks: { callback: (v) => v + "%" },
        title: { display: true, text: "Rate (%)" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AppointmentsChart;