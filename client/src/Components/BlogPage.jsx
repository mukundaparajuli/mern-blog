import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import { UserContext } from "../store/userContext";
import AddComment from "./AddComment";
import CommentSection from "./CommentSection";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const { _id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

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
  }, [_id]);

  return (
    <div className="bg-slate-300 w-full flex justify-center items-center flex-col min-h-screen h-full overflow-auto">
      {blog && (
        <div key={_id} className="w-2/3 flex flex-col gap-4 mt-4">
          <div className="font-bold text-4xl text-center my-4">
            {blog.title}
          </div>
          <div>
            <img
              src={blog.coverImage}
              alt="cover image"
              className="rounded-xl p-1 my-4 w-full h-auto"
            />
          </div>
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
      <div className="w-2/3 m-4">
        <AddComment blogId={_id} />
        <div
          className="flex justify-between items-center w-full bg-white my-2 p-4 rounded-md font-bold text-lg cursor-pointer hover:bg-gray-100 transition-all"
          onClick={() => setShowComments(!showComments)}
        >
          <div>{showComments ? "Hide" : "View"} Comments</div>
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
  );
};

export default BlogPage;
