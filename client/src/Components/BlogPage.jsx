import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";

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
    <div className="bg-slate-300 w-full flex justify-center items-center flex-col sticky h-full overflow-scroll-y">
      {blog && (
        <div key={_id} className="w-2/3 flex  flex-col gap-4 mt-4">
          <div className="font-bold text-4xl text-center my-4">
            {blog.title}
          </div>
          <div>
            <img
              src={blog.coverImage}
              alt="cover image"
              className="rounded-xl p-1  my-4 w-full h-auto"
            />
          </div>
          {console.log(blog.title)}
          <div
            className="text-lg font-semibold text-justify my-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.blogDescription),
            }}
          ></div>

          <div className="my-4 py-4">
            {blog.author ? (
              <div className="font-bold text-md italic">{blog?.author}</div>
            ) : (
              <div className="font-bold text-lg italic">Mukunda Parajuli</div>
            )}
            <div className="font-semibold text-md italic">
              {moment(blog?.date).format("MMM Do YY")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
