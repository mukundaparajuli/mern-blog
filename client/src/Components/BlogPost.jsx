import DOMPurify from "dompurify";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = ({ title, blogDescription, coverImage, _id }) => {
  const navigate = useNavigate();

  const handleBlogPage = (_id) => {
    navigate("/blog/" + _id);
  };
  return (
    <div className="m-12 h-72 shadow-lg rounded-lg my-4 pr-8 w-2/3 flex justify-evenly bg-slate-100">
      <img
        src={coverImage}
        alt="Ìmage"
        className="h-72 w-1/2 content object-cover mr-6 ml-0 rounded-l-lg"
      />
      <div className="h-72 w-1/2">
        <div className="font-bold text-3xl text-black my-2 py-2">{title}</div>
        <div
          className="overflow-hidden text-justify h-36 text-blog-desc"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogDescription),
          }}
        ></div>
        <button
          className="w-full rounded-xl bg-black text-white font-semibold py-1 my-8"
          onClick={() => handleBlogPage(_id)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
