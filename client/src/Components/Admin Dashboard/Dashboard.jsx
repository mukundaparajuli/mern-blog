import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "../Header";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col no-scrollbar p-14">
      <div className="top-0 w-full z-20">
        <Header />
      </div>
      <div className="flex flex-grow pt-16">
        <SideBar />
        <div className="w-3/4 ml-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
