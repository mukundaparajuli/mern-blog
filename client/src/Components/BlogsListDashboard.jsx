import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const BlogsListDashboard = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 bg-slate-300 w-full min-h-screen h-full overflow-auto ">
      <Header />
      <SearchBar />
      <Categories />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BlogsListDashboard;
