import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotedDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[50px_1.5fr_80px_2fr_1.5fr_100px_120px] bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        <div className="divide-y divide-gray-200">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[50px_1.5fr_80px_2fr_1.5fr_100px_120px] items-center px-4 py-3 text-sm text-gray-700"
            >
              {/* Index */}
              <p>{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p>{item.userData.name}</p>
              </div>

              {/* Age */}
              <p>{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p>{slotedDateFormat(item.slotDate)}, {item.slotTime}</p>

              {/* Doctor */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <p>{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p>{currency}{item.amount}</p>

              {/* Actions */}
              <div>
                {item.cancel 
                ? (
                  <p className="text-red-400 text-sm font-medium">Cancel</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments