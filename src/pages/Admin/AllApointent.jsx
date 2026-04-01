import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext)

  const { calculateAge, slotedDateFormat, currency } =
    useContext(AppContext)

  //  Search state
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  // Filter appointments by patient name
  const filteredAppointments = appointments.filter((item) =>
    item.userData?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen rounded-2xl">
      
      {/* SEARCH BAR */}
      <div className="mb-4 sm:mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        All Appointments
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-[40px_1.5fr_80px_2fr_1.5fr_100px_100px] bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        <div className="divide-y">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Appointments found
            </div>
          ) : (
            filteredAppointments.slice().reverse().map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[40px_1.5fr_80px_2fr_1.5fr_100px_100px] items-center px-4 py-3 text-sm hover:bg-gray-50 transition"
              >
                <p>{index + 1}</p>

                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p>{item.userData.name}</p>
                </div>

                <p>{calculateAge(item.userData.dob)}</p>

                <p>
                  {slotedDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                <div className="flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p>{item.docData.name}</p>
                </div>

                <p>{currency}{item.amount}</p>

                <div>
                  {item.cancel ? (
                    <span className="text-red-500 font-medium">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-500 font-medium">Completed</span>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-10">
            No Appointment found
          </div>
        ) : (
          filteredAppointments.slice().map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-3">

              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">#{index + 1}</p>

                {item.cancel ? (
                  <span className="text-red-500 text-xs">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-500 text-xs">Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt=""
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">
                    {item.userData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Age: {calculateAge(item.userData.dob)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-2">
                {slotedDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm">{item.docData.name}</p>
                </div>
                <p className="font-semibold text-sm">
                  {currency}{item.amount}
                </p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllAppointments