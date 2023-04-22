import { create } from 'zustand'

// stores profile details which user enters on registration
const useProfileStore = create((set) => ({
    Profile: {username:"", hallId:"", role:"", password:""},
    setProfile: (username, hallId, role, password) => {
        set((state) => ({
            ...state,
            Profile: {username, hallId, role, password}
        }))
    }
}))

const loggedInProfileStore = create((set)=>({
    Profile: {username:"", hallId:"", password:""},
    setProfile: (username,hallId,password)=>{
        set((state)=>({
            ...state,
            Profile: {username,hallId,password}
        }))
    }
}))

export default useProfileStore
export { loggedInProfileStore }