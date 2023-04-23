import { create } from "zustand";
  
const useLoggerStore = create((set)=>({
    loggedIn: false,
    setLogger: ()=>{
        set((state)=>({
            ...state,
            loggedIn: !state.loggedIn
        }))
    }
}))
  
  export default useLoggerStore;