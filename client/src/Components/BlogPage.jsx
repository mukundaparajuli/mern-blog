import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blog/blogs/${_id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.blog);
          setBlog(data.blog);
        }
      } catch (err) {
        console.log("Error occurred while fetching the blog: ", err);
      }
    };

    getBlog();
  }, []);

  return (
    <div className="h-auto bg-slate-300 w-full flex justify-center items-center flex-col ">
      {blog && (
        <div key={_id} className="w-2/3 flex  flex-col gap-4 mt-4">
          <div className="font-bold text-5xl text-start my-4">{blog.title}</div>
          <div>
            <img
              src={blog.coverImage}
              alt="cover image"
              className="rounded-xl p-1 w-auto my-4 h-auto"
            />
          </div>
          {console.log(blog.title)}
          <div className="text-md font-semibold text-justify my-4">
            {blog.blogDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
