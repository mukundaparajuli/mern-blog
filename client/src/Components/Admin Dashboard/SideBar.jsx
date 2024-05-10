import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="fixed bg-gray-700 text-white w-1/4 h-[100vh] flex flex-col gap-4">
      <Link to={"/admin/text-editor"}>Text Editor</Link>
      <Link to={"/admin/users"}>Users</Link>
      <Link to={"/admin/post-analysis"}>Analysis</Link>
      <Link to={"/admin/view-posts"}>View Post</Link>
    </div>
  );
};

export default SideBar;
