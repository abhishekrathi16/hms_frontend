import React,{ useState } from "react";
import ResponsiveAppBar from "./Navbar"

const Layout = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <>
      <ResponsiveAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div>{children}</div>
    </>
  );
};

export default Layout;
