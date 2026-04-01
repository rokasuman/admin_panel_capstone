import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";


const DoctorDashboard = () => {
 
  const {
    dashData,
    getDashData,
    dToken,
    completeAppointment,
    cancelAppointment,
    setDashData,
  } = useContext(DoctorContext);

  const { currency, slotedDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      setDashData(null);
      getDashData();
    }
    return()=>{
      setDashData(null)
    }
  }, [dToken]);

  if (!dashData) return <p className="text-center mt-10">Loading...</p>;

  const appointments = dashData?.latestAppointments || [];

  return (
    <div className="m-3 sm:m-5">
     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        

        <div className="bg-gray-300 text-black rounded-lg p-4 flex items-center space-x-3">
          <img src={assets.earning_icon} alt="" className="w-8 h-8" />
          <div>
            <p className="text-xl font-bold">
              {currency}{dashData.earning || 0}
            </p>
            <p className="text-xs uppercase">Earning</p>
          </div>
        </div>

        <div className="bg-gray-300 text-black rounded-lg p-4 flex items-center space-x-3">
          <img src={assets.appointments_icon} alt="" className="w-8 h-8" />
          <div>
            <p className="text-xl font-bold">{dashData.appointments || 0}</p>
            <p className="text-xs uppercase">Appointments</p>
          </div>
        </div>

          <div className="bg-gray-300 text-black rounded-lg p-4 flex items-center space-x-3">
          <img src={assets.patients_icon} alt="" className="w-8 h-8" />
          <div>
            <p className="text-xl font-bold">{dashData.patients || 0}</p>
            <p className="text-xs uppercase">Patients</p>
          </div>
        </div>

      </div>


      <div className="bg-white shadow rounded-xl p-4 mt-5">
        <h2 className="text-xl font-semibold mb-3">Latest Appointments</h2>

        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">

          {appointments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Appointments has been made
            </div>
          ) : (
            appointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition"
              >
             
                <div className="flex items-center space-x-3">
                  <img
                    src={item.userData?.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.userData?.name}</p>
                    <p className="text-gray-500 text-sm">
                      {slotedDateFormat(item.slotDate)}, {item.slotTime}
                    </p>
                  </div>
                </div>

              
                {item.cancel ? (
                  <p className="text-rose-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-8 h-8 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt=""
                      className="w-8 h-8 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
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

export default DoctorDashboard;