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
// deleting the doctor 
const deleteDoctor =async (id)=>{
  if(!window.confirm("Are you sure you want to delete the doctor?")) return;
try {
  const {data} = await axios.delete(`${backendURL}/api/admin/delete-doctor/${id}`,{headers:{atoken:aToken}});
  if(data.success){
    toast.success(data.message)
    getAllDoctors()
  }else{
    toast.error(data.message || "Failed to delet the doctor")
  }
} catch (error) {
  console.log(error)
  toast.error("Server error while deleting the doctor")
}
} 
//edting the doctor
const editDoctor = async(id,formData)=>{
  try {
    const{data} = await axios.put(`${backendURL}/api/admin/edit-doctor/${id}`,formData,
      {headers:{atoken:aToken}}
    )
    if(data.success){
      toast.success(data.message)
      getAllDoctors()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || "Failded to update doctor")
  }

}
//changeing the availabilty
const changeAvailability = async (docId) => {
  try {
    const { data } = await axios.post(
      backendURL + "/api/admin/change-availability",
      { docId },
      { headers: { atoken: aToken } }
    );

    if (data.success) {
      toast.success(data.message);
      getAllDoctors();
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
//get all the appointmets 
//state to store all the appointments 

  const [appointments,setAppointments] = useState([])

  const getAllAppointments = async() =>{

    try {
      const {data} = await axios.get(backendURL + "/api/admin/appointments",{headers:{aToken}})
      console.log("appointments APIS :" , data)

      if(data.success){
        setAppointments(data.appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  //cancel the appointment 
  const cancelAppointment  =async (appointmentId) =>{

    try {
      const {data} = await axios.post(backendURL + "/api/admin/appointment-cancel",{appointmentId},{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }

  };
  //state to store the dashData 
  const[dashData,setDashData] = useState(false)

  const getDashData = async ()=>{

    try {
      const {data} = await axios.get( backendURL + "/api/admin/dashboard",{headers:{aToken}})

      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
      
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendURL,
    doctors,
    getAllDoctors,
    deleteDoctor,
    editDoctor,
    changeAvailability,
    getAllAppointments,
    appointments,
    cancelAppointment,
    dashData,
    getDashData

  };
  
  
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;