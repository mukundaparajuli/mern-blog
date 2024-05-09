import { useState } from "react";
import BlogPost from "./BlogPost";
import Header from "./Header";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/api/blog/blogs", {
      method: "GET",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setBlogs(data.blogs);
      console.log(data.blogs);
      console.log(blogs);
    } else {
      console.log(response);
    }
  };
  useState(() => {
    getBlogs();
  }, []);

  return (
    <div className="bg-fixed">
      <Header />
      <div className="flex justify-center items-center flex-col bg-slate-300">
        {blogs && blogs.map((blog) => <BlogPost {...blog} key={blog._id} />)}
      </div>
    </div>
  );
};

export default BlogPage;
