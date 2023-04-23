import React,{ useState } from "react";
import ResponsiveAppBar from "./Navbar"

const Layout = ({children}) => {
  return (
    <>
      <ResponsiveAppBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
