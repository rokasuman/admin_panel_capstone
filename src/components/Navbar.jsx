import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // logout function
  const logout = () => {
    navigate("/");

    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 border-b border-gray-200">
      
      <div className="flex items-center gap-3">
        <img className="w-20" src={assets.Logo} alt="logo" />

        <p className="text-sm bg-blue-100 px-3 py-1 rounded-md text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;