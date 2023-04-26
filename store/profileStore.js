import { create } from 'zustand'

// stores profile details which user enters on registration
const useProfileStore = create((set) => ({
  userName: "",
  hallId: "",
  setProfile: (value) => {
    set((state) => ({
      userName: (state.userName = value.userName),
      hallId: (state.hallId = hallId),
    }));
  },
}));

const loggedInProfileStore = create((set)=>({
    userName:"",
    hallId:"",
    token:"",
    setProfile: (value)=>set((state)=>({
            userName: state.userName =  value.userName, hallId : state.hallId =value.hallId
        })),
    setToken:(token)=>set((state)=>({
        token:state.token = token
    }))
}))

export default useProfileStore
export { loggedInProfileStore }