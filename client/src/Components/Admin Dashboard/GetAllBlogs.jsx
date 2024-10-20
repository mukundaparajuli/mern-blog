import { useContext, useState } from "react";
// import BlogPost from "./BlogPost";
// import Header from "./Header";
// import { UserContext } from "../store/userContext";
import { UserContext } from "../../store/userContext";
import BlogCard from "./BlogCard";

const GetAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useContext(UserContext);
  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/api/blog/blogs", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();

      setBlogs(data.blogs);
    } else {
      console.log(response.error);
    }
  };
  useState(() => {
    getBlogs();
  }, []);

  return (
    <div className="bg-fixed">
      <div className="flex justify-center items-center flex-col bg-slate-300">
        {blogs && blogs.map((blog) => <BlogCard {...blog} key={blog._id} />)}
      </div>
    </div>
  );
};

export default GetAllBlogs;
