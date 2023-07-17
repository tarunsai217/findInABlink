import React from "react";
import "./Layout.css";
import Header from "../Components/Header/Header";
function Layout({ children }) {
  return (
    <div className="h-[100vh] bg-[#1D1D1D] text-white flex flex-col">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
