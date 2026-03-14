import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken, getAllDoctors]);

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center"
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-200 mb-4"
            />

            {/* Doctor Info */}
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-500 mb-3">{doctor.speciality}</p>

              {/* Availability Toggle */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    doctor.avaiable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {doctor.avaiable ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;