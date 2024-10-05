import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPost from "./BlogPost";

const BlogListByCategory = () => {
  let [blogsByCategory, setBlogsByCategory] = useState([]);
  const { categories } = useParams();

  console.log(categories);
  const getBlogsByCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/blogs/category/${categories}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.blogs);
        setBlogsByCategory(data.blogs);
      } else {
        console.log(await response.error());
      }
    } catch (error) {
      console.log("Error while fetching blogs by categories");
    }
  };

  useEffect(() => {
    getBlogsByCategory();
  }, [categories]);
  return (
    <div className="flex justify-center items-center flex-col w-full no-scrollbar">
      {blogsByCategory ? (
        blogsByCategory.map((blog) => <BlogPost {...blog} key={blog._id} />)
      ) : (
        <div>Blog not found for this category!</div>
      )}
    </div>
  );
};

export default BlogListByCategory;
