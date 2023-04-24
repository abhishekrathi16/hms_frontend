import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { loggedInProfileStore } from "@/store/profileStore";
import useLoggerStore from "@/store/login_logoutStore";
export default function App({ Component, pageProps }) {
  const { userName,hallId , setProfile, setToken } = loggedInProfileStore((state) => ({
    userName:state.userName,
    hallId:state.hallId,
    setProfile: state.setProfile,
    setToken: state.setToken,
  }));
  const state = useLoggerStore();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      console.log(localStorage.getItem("token"));
      let value = {
        userName:localStorage.getItem("userName"),
        hallId:localStorage.getItem("hallId"),
      }

      setProfile(value)
      setToken(localStorage.getItem("token"))
      console.log("Profile", userName, "hall",hallId);
      state.setLogger(true)
      console.log(state.loggedIn)
    }
  },[])
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
