import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";

const BlogsListDashboard = () => {
  return (
    <div className="bg-fixed bg-slate-300 min-h-screen">
      <div className="m-12">
        <Header />
        <Categories />
        <Outlet />
      </div>
    </div>
  );
};

export default BlogsListDashboard;