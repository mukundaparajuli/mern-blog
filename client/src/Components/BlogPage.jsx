import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import AddComment from "./AddComment";
import CommentSection from "./CommentSection";
import Header from "./Header";
import Footer from "./Footer";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const { _id } = useParams();
  const [showComments, setShowComments] = useState(false);

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
          setBlog(data.blog);
        }
      } catch (err) {
        console.log("Error occurred while fetching the blog: ", err);
      }
    };

    getBlog();
  }, [_id]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 w-screen">
        <Header />
        {blog && (
          <div className="bg-white shadow-lg rounded-lg w-11/12 lg:w-2/3 my-6 p-6">
            <div className="text-center text-4xl font-bold my-4">
              {blog.title}
            </div>
            <div className="flex justify-center my-4">
              <img
                src={blog.coverImage}
                alt="cover image"
                className="rounded-lg w-full lg:w-2/3"
              />
            </div>
            <div
              className="text-lg text-justify my-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.blogDescription),
              }}
            ></div>
            <div className="flex justify-between items-center my-4 py-4 border-t border-gray-200">
              <div className="font-bold text-md italic">
                {blog.author || "Mukunda Parajuli"}
              </div>
              <div className="font-semibold text-md italic">
                {moment(blog.date).format("MMM Do YY")}
              </div>
            </div>
          </div>
        )}
        <div className="w-11/12 lg:w-2/3">
          <AddComment blogId={_id} />
          <div
            className="flex justify-between items-center w-full bg-white my-2 p-4 rounded-md shadow cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => setShowComments(!showComments)}
          >
            <div className="font-bold text-lg">
              {showComments ? "Hide" : "View"} Comments
            </div>
            <button
              className={`transform transition-transform ${
                showComments ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 5.25l7.5 7.5 7.5-7.5M4.5 11.25l7.5 7.5 7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {showComments && <CommentSection blogId={_id} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
