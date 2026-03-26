import React, { useContext, useState } from 'react'

import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from "axios"


const Login = () => {

    // state to manage admin or doc login 
    const [state,setState] = useState("Admin")

    //state to store the email and password 
    const[email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    //DEstrucuring the adminconstext
    const {setAToken,backendURL} = useContext(AdminContext)

  //function to submit the form 
  const onSubmitHandler = async (event)=>{
   event.preventDefault()

   //api call 
   try {
    if(state==="Admin"){
        const {data} = await axios.post(`${backendURL}/api/admin/login`,{email,password})
        if(data.success){
            //stroing token in localStroge
            localStorage.setItem("aToken",data.token)
            setAToken(data.token);
            console.log("Token:",data.token)
            toast.success("Login successfully")
        }else{
          toast.error("Invaild email or password")
        }
    }
   } catch (error) {
    console.log(error)
    toast.error("Some went wrong")
    
    
   }
  }

return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">
           
           <p className="text-2xl font-semibold text-center mb-6 text-gray-800">
            <span className="text-blue-600">{state}</span> Login
           </p>

           <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1 font-medium">Email</p>
            <input
              type='email'
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
           </div>

           <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1 font-medium">Password</p>
            <input
              type='password'
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
           </div>

           <button className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition duration-200">
            Login
           </button>

           <div className="text-center mt-5 text-sm text-gray-600">
           {
            state === "Admin"
            ? (
              <p>
                Doctor Login?
                <span 
                  onClick={()=>setState("Doctor")} 
                  className="text-blue-600 ml-1 cursor-pointer font-medium hover:underline hover:text-blue-700"
                >
                  Click here
                </span>
              </p>
            )
            : (
              <p>
                Admin Login?
                <span 
                  onClick={()=>setState("Admin")} 
                  className="text-blue-600 ml-1 cursor-pointer font-medium hover:underline hover:text-blue-700"
                >
                  Click here
                </span>
              </p>
            )
           }
           </div>

        </div>
    </form>
    
  )
  
}


export default Login