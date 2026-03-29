import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

// Charts
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const {
    dashData,
    getDashData,
    aToken,
    cancelAppointment,
    getAllAppointments,
  } = useContext(AdminContext);

  const { slotedDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllAppointments();

      const interval = setInterval(() => {
        getDashData();
        getAllAppointments();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [aToken]);

  if (!dashData) return null;

  /* -- BAR CHART --*/
  const doctorMap = {};

  dashData.latestAppointment?.forEach((a) => {
    const docName = a.docData?.name;
    if (!doctorMap[docName]) doctorMap[docName] = 0;
    doctorMap[docName]++;
  });

  const barData = {
    labels: Object.keys(doctorMap),
    datasets: [
      {
        label: "Patients",
        data: Object.values(doctorMap),
        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Patients per Doctor" },
    },
  };

  /*-- LINE CHART -- */
  const labels =
    dashData.latestAppointment?.map((a) => slotedDateFormat(a.slotDate)) || [];

  const totalData = dashData.latestAppointment?.map(() => 1) || [];

  const cancelledData =
    dashData.latestAppointment?.map((a) => (a.cancel ? 1 : 0)) || [];

  const lineData = {
    labels,
    datasets: [
      {
        label: "Total Appointments",
        data: totalData,
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Cancelled",
        data: cancelledData,
        borderColor: "rgba(239,68,68,1)",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Appointments Trend" },
    },
  };

  return (
    <div className="m-3 sm:m-5 grid grid-cols-1 gap-4 sm:gap-6">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-blue-500 text-white rounded-lg p-3 sm:p-4 flex items-center gap-3">
          <img src={assets.doctor_icon} className="w-6 h-6 sm:w-8 sm:h-8" />
          <div>
            <p className="text-lg sm:text-xl font-bold">{dashData.doctors}</p>
            <p className="text-[10px] sm:text-xs uppercase">Doctors</p>
          </div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-3 sm:p-4 flex items-center gap-3">
          <img
            src={assets.appointments_icon}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <div>
            <p className="text-lg sm:text-xl font-bold">
              {dashData.appointments}
            </p>
            <p className="text-[10px] sm:text-xs uppercase">Appointments</p>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-3 sm:p-4 flex items-center gap-3">
          <img src={assets.patients_icon} className="w-6 h-6 sm:w-8 sm:h-8" />
          <div>
            <p className="text-lg sm:text-xl font-bold">{dashData.patients}</p>
            <p className="text-[10px] sm:text-xs uppercase">Patients</p>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow h-[250px] sm:h-[300px]">
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl shadow h-[250px] sm:h-[300px]">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white shadow rounded-xl p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Latest Appointments
        </h2>

        <div className="divide-y divide-gray-200 max-h-[300px] sm:max-h-96 overflow-y-auto">
          {dashData?.latestAppointment?.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Appointment has been made
            </div>
          ) : (
            dashData.latestAppointment.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 sm:p-3 hover:bg-gray-50 rounded"
              >
                {/* USER */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData?.image || item.docData?.image}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {item.userData?.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {slotedDateFormat(item.slotDate)}, {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <div className="self-end sm:self-auto">
                  {item.cancel ? (
                    <p className="text-red-400 text-xs sm:text-sm font-medium">
                      Cancel
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs sm:text-sm font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
