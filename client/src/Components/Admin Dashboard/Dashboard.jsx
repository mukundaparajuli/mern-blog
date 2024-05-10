import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex relative w-full">
      <SideBar />
      <div className="w-3/4 absolute right-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
