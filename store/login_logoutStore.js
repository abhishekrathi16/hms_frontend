import { create } from "zustand";
  
const useLoggerStore = create((set)=>({
    loggedIn: false,
    setLogger: (value)=>{
        set((state)=>({
            loggedIn: state.loggedIn = value
        }))
    }
}))
  
  export default useLoggerStore;