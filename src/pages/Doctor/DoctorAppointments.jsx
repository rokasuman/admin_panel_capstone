import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotedDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        All Appointments
      </p>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {/* Header */}
        <div className="min-w-[800px] grid grid-cols-7 bg-gray-200 p-3 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        <div className="min-w-[800px]">
          {appointments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Appointments has been made
            </div>
          ) : (
            appointments.reverse().map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 items-center p-3 sm:p-4 border-b text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <p>{index + 1}</p>

                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <p className="truncate">{item.userData.name}</p>
                </div>

                <p>{item.payment ? "Online" : "Cash"}</p>

                <p>{calculateAge(item.userData.dob)}</p>

                <p className="truncate">
                  {slotedDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                <p>
                  {currency}
                  {item.amount}
                </p>
                {item.cancel ? (
                  <p className="text-rose-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-14 h-14 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt=""
                      className="w-14 h-14 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
