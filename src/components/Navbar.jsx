import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  
  // destructing the atokne from adminContext 
  const { aToken,setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  //function for logout
  const lagout = ()=>{
    navigate("/")
    aToken && setAToken("")
    aToken && localStorage.removeItem("aToken")
  }


  return (
    <div className="w-full flex items-center justify-between px-6 py-3 border-b border-gray-200 ">

      <div className="flex items-center gap-3">
        <img className="w-20" src={assets.Logo} alt="logo" />
        <p className="text-sm bg-blue-100 px-3 py-1 rounded-md text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button onClick={lagout} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition">
        Logout
      </button>

    </div>
  )
}

export default Navbar