import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const BlogsListDashboard = () => {
  return (
    <div className="no-scrollbar bg-slate-200 h-full overflow-auto ">
      <div className="min-h-screen">
        <Header />
        <SearchBar />
        <Categories />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default BlogsListDashboard;
