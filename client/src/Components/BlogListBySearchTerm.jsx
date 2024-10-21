import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPost from "./BlogPost";

const BlogListBySearchTerm = () => {
  let [blogsBySearchTerm, setBlogsBySearchTerm] = useState([]);
  const { searchTerm } = useParams();

  const getBlogsBySearchTerm = async () => {
    try {
      const response = await fetch(
        `https://techtonic-backend.onrender.com/api/blog/blogs/search/${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBlogsBySearchTerm(data.blogs);
      } else {
        console.log(await response.error());
      }
    } catch (error) {
      console.log("Error while fetching blogs by categories");
    }
  };

  useEffect(() => {
    getBlogsBySearchTerm();
  }, [searchTerm]);
  return (
    <div className="flex justify-center items-center flex-col w-full">
      {blogsBySearchTerm ? (
        blogsBySearchTerm.map((blog) => <BlogPost {...blog} key={blog._id} />)
      ) : (
        <div>Blog not found for this SearchTerm!</div>
      )}
    </div>
  );
};

export default BlogListBySearchTerm;
