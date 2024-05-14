import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="fixed bg-gray-700 text-white w-1/4 h-[100vh] flex flex-col gap-4 p-3">
      <NavLink
        to={"/admin/text-editor"}
        className={({ isActive }) => [
          isActive ? "text-blue-600" : "text-white",
        ]}
      >
        Text Editor
      </NavLink>
      <NavLink
        to={"/admin/users"}
        className={({ isActive }) => [
          isActive ? "text-blue-600" : "text-white",
        ]}
      >
        Users
      </NavLink>
      <NavLink
        to={"/admin/post-analysis"}
        className={({ isActive }) => [
          isActive ? "text-blue-600" : "text-white",
        ]}
      >
        Analysis
      </NavLink>
      <NavLink
        to={"/admin/view-posts"}
        className={({ isActive }) => [
          isActive ? "text-blue-600" : "text-white",
        ]}
      >
        View Post
      </NavLink>
    </div>
  );
};

export default SideBar;
