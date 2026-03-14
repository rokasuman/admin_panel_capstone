import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  // state to store the token
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  // state to store doctors
  const [doctors, setDoctors] = useState([]);

  // backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // getting all doctors
  const getAllDoctors = async () => {
    try {

      const { data } = await axios.post(
        backendURL + "/api/admin/all-doctors",
        {},
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendURL,
    doctors,
    getAllDoctors,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;