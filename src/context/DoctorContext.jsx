import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextPrvider = (props)=>{

    const value = {

    }
    return(
        <DoctorContext value={value}>
          {props.children}
        </DoctorContext>
    )

}
export default DoctorContextPrvider