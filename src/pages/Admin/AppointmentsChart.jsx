import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientsBarChart = ({ appointments }) => {
  const doctorMap = {};
  appointments.forEach((a) => {
    const doc = a.docData;
    if (!doctorMap[doc.name]) doctorMap[doc.name] = 0;
    doctorMap[doc.name] += 1;
  });

  const labels = Object.keys(doctorMap);
  const dataValues = Object.values(doctorMap);

  const data = {
    labels,
    datasets: [
      {
        label: "Patients",
        data: dataValues,
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderRadius: 6,
        barThickness: "flex",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 important for responsiveness
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Patients per Doctor",
        font: {
          size: window.innerWidth < 640 ? 14 : 18, // responsive title
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : 12, // smaller on mobile
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PatientsBarChart;