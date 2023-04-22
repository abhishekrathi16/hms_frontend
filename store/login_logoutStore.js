import { create } from "zustand";
  
const useLoggerStore = create((set)=>({
    loggedIn: true,
    setLogger: ()=>{
        set((state)=>({
            ...state,
            loggedIn: !state.loggedIn
        }))
    }
}))
  
  export default useLoggerStore;