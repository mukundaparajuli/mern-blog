import React from "react";

const BlogPost = ({ title, description, image }) => {
  return (
    <div className="m-12 h-78 shadow-lg rounded-lg my-4 pr-8 w-2/3 flex justify-evenly bg-[#F9FAFB]">
      <img
        src={image}
        alt="Ìmage"
        className="h-80 w-1/2 content object-cover mr-6 ml-0 rounded-l-lg"
      />
      <div className="h-80 w-1/2">
        <div className="font-bold text-3xl text-blog-title my-2 py-2">
          {title}
        </div>
        <div className="overflow-hidden text-justify h-40 text-blog-desc">
          {description}
        </div>
        <button className="w-full rounded-xl bg-black text-white font-semibold py-1 my-8">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
