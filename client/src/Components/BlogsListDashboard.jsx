import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

const BlogsListDashboard = () => {
  return (
    <div className="bg-fixed bg-slate-300 min-h-screen">
      <div className="mx-12">
        <Header />
        <SearchBar />
        <Categories />
        <Outlet />
      </div>
    </div>
  );
};

export default BlogsListDashboard;
