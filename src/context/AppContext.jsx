import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const currency = "$"
    
    //calculate age

  const calculateAge = (dob) => {
  if (!dob) return "N/A"; 

  const birth = new Date(dob);

  //  check if date is valid
  if (isNaN(birth.getTime())) return "N/A";

  const today = new Date();
  const diff = today - birth;

  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

  return `${age} year${age !== 1 ? "s" : ""}`;
};
    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotedDateFormat = (slotDate) => {
    const dataArray = slotDate.split("_")
    return dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
  }

    const value ={
      calculateAge,
      slotedDateFormat,
      currency
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider