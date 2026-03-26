import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import AppointmentsChart from "./AppointmentsChart";

const Dashboard = () => {
  const { dashData, getDashData, aToken, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Doctors Card */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition duration-300">
          <img src={assets.doctor_icon} alt="Doctor Icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{dashData.doctors}</p>
            <p className="text-sm uppercase tracking-wide text-gray-200">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition duration-300">
          <img src={assets.appointments_icon} alt="Appointments Icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{dashData.appointments}</p>
            <p className="text-sm uppercase tracking-wide text-gray-200">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition duration-300">
          <img src={assets.patients_icon} alt="Patients Icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{dashData.patients}</p>
            <p className="text-sm uppercase tracking-wide text-gray-200">Patients</p>
          </div>
        </div>

        {/* Latest Booking - full width */}
        <div className="sm:col-span-3 bg-white shadow-lg rounded-xl p-5 mt-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <img src={assets.list_icon} alt="Latest Booking Icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold">{dashData.latestAppointment?.length || 0}</p>
              <p className="text-sm uppercase text-gray-600">Latest Booking</p>
            </div>
          </div>
           {/* Chart Component */}
      <div className="sm:col-span-3 bg-white shadow-lg rounded-xl p-5 mt-6">
        <AppointmentsChart latestAppointments={dashData.latestAppointment} />
      </div>

          {/* Latest Appointments List */}
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto mt-6">
            {dashData.latestAppointment.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                    <p className="text-gray-500 text-sm">{item.slotDate}</p>
                  </div>
                </div>

                {/* Cancel / Status */}
                <div>
                  {item.cancel ? (
                    <p className="text-red-500 text-sm font-medium">Cancelled</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;