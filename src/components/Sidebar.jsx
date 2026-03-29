import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken} = useContext(DoctorContext)
  

  return (
   <div className="w-64 min-h-screen bg-blue-100 border-r border-gray-200 mt-2">
      {aToken && (
        <ul className="flex flex-col gap-2 p-4 text-gray-700">

          <NavLink
            to="/admin-dashboard"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>

        </ul>
      )}
      {dToken && (
        <ul className="flex flex-col gap-2 p-4 text-gray-700">

          <NavLink
            to="/doctor-dashboard"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

         

          <NavLink
            to="/doctor-profile"
            className={({isActive}) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <img className="w-5" src={assets.people_icon} alt="" />
            <p>My Profile</p>
          </NavLink>

        </ul>
      )}

    </div>
  )
}

export default Sidebar