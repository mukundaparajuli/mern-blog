import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

const BlogsListDashboard = () => {
  return (
    <div className="bg-slate-300 min-h-[100vh]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <SearchBar />
        <Categories />
        <Outlet />
      </div>
    </div>
  );
};

export default BlogsListDashboard;
