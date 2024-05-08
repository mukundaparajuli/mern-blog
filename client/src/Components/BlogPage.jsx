import { useState } from "react";
import BlogPost from "./BlogPost";
import { dummyBlogData } from "../config";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/api/blogs", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setBlogs(data.blogs);
      console.log(data.blogs);
      console.log(blogs);
    }
  };
  useState(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col bg-[#D7DCDD]">
      {blogs && blogs.map((blog) => <BlogPost {...blog} key={blog._id} />)}
    </div>
  );
};

export default BlogPage;
