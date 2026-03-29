import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const UpdateProfile = async () => {
    try {
      const updatedData = {
        docId: profileData._id,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/updated-profile",
        updatedData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="p-5 flex justify-center mt-5">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-5">

    
        <div className="flex flex-col items-center space-y-3">
          <img
            src={profileData.image}
            alt=""
            className="w-32 h-32 rounded-full object-cover border"
          />
          <p className="text-2xl font-semibold">{profileData.name}</p>
        </div>

        <div className="text-center text-gray-600">
          <p className="font-medium">
            {profileData.degree} - {profileData.speciality}
          </p>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm">
            {profileData.experience}
          </button>
        </div>


        <div>
          <p className="font-semibold mb-1">About:</p>
          <p className="text-gray-600 text-sm">{profileData.about}</p>
        </div>

        {/* Fees (EDITABLE) */}
        <div className="flex justify-between items-center border-t pt-3">
          <p className="text-sm font-medium">Appointment fees :</p>
          <span className="text-green-600 font-semibold flex items-center gap-2">
            {currency}
            {isEdit ? (
              <input
                type="number"
                className="border rounded-md px-2 py-1 w-20"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData(prev => ({ ...prev, fees: e.target.value }))
                }
              />
            ) : (
              profileData.fees
            )}
          </span>
        </div>

        {/* Availability (EDITABLE) */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={profileData.available}
            onChange={() =>
              setProfileData(prev => ({ ...prev, available: !prev.available }))
            }
            className="w-4 h-4 cursor-pointer"
          />
          <label className="text-sm text-gray-600">Available</label>
        </div>

        {/* Edit / Save Button */}
        <button
          onClick={() => {
            if (isEdit) {
              UpdateProfile()
            } else {
              setIsEdit(true)
            }
          }}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEdit ? "Save" : "Edit"}
        </button>

      </div>
    </div>
  )
}

export default DoctorProfile