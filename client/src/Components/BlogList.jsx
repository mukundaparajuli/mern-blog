import { useContext, useState } from "react";
import BlogPost from "./BlogPost";
import { UserContext } from "../store/userContext";

const BlogList = () => {
  const { userInfo } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/api/blog/blogs", {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
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
    <div className="flex justify-center items-center flex-col w-full no-scrollbar">
      {blogs && blogs.map((blog) => <BlogPost {...blog} key={blog._id} />)}
    </div>
  );
};

export default BlogList;
