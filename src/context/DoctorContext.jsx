import { createContext, useState ,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

export const DoctorContext = createContext()


const DoctorContextPrvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    
   const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
    const[appointments, setAppointments] = useState([])

    const getAppointments = async ()=>{

        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/appointments",{headers:{dToken}})
             setAppointments(data.appointments)
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //function to mark appointments as complete 
    const completeAppointment = async(appointmentId) =>{

        try {
            const {data} = await axios.post(backendUrl + "/api/doctor/complete-appointment",{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                
            }else{
             toast.error(data.message)
            }
        } catch (error) {
           toast.error(error.message) 
        }
    }
     
     //function to mark appointments as cancel 
    const cancelAppointment = async(appointmentId) =>{

        try {
            const {data} = await axios.post(backendUrl + "/api/doctor/cancel-appointment",{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
            
            }else{
             toast.error(data.message)
            }
        } catch (error) {
           toast.error(error.message) 
        }
    }

    //storing dash data of doc
    const[dashData,setDashData] = useState(null)

    const getDashData = async () =>{

        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/dashboard",{headers:{dToken}})

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
    //store to profile data 
const [profileData, setProfileData] = useState(false)

const getProfileData =async () =>{

  try {
    const {data} = await axios.get(backendUrl + "/api/doctor/profile",{headers:{dToken}})

    if(data.success){
        setProfileData(data.profileData)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
  useEffect(() => {
    if (dToken) {
   navigate("/doctor-dashboard")
    }
  }, [dToken]);


    const value = {
     dToken,setDToken,backendUrl,getAppointments,appointments,completeAppointment,cancelAppointment,dashData,setDashData,getDashData,getProfileData,profileData,setProfileData
    }
    return(
        <DoctorContext.Provider value={value}>
          {props.children}
        </DoctorContext.Provider>
    )

}
export default DoctorContextPrvider