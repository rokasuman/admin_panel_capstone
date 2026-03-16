import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import AddEditDoctor from "./EditDoctor";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, deleteDoctor, changeAvailability } =
    useContext(AdminContext);

  const [editingDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken,getAllDoctors]);

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Doctors</h1>

      {editingDoctor && (
        <AddEditDoctor
          editingDoctor={editingDoctor}
          setEditingDoctor={setEditDoctor}
        />
      )}

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
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

              <p className="text-sm text-gray-500 mb-3">
                {doctor.speciality}
              </p>

              {/* Availability */}
              <div className="flex flex-col items-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    doctor.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {doctor.available ? "Available" : "Unavailable"}
                </span>

                {/* Toggle Switch */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                    className="sr-only peer"
                  />

                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 relative transition">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                  </div>
                </label>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setEditDoctor(doctor)}
                    className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <LiaEdit size={18} />
                  </button>

                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;