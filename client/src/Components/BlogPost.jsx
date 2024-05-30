import DOMPurify from "dompurify";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import save from "../assets/save.png";
import saved from "../assets/saved.png";
import { UserContext } from "../store/userContext";

const BlogPost = ({ title, blogDescription, coverImage, _id }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(true);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!userInfo || !_id) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/saved/savedPost/${userInfo.userId}`
        );
        const data = await response.json();
        if (data.savedPosts.includes(_id)) {
          setIsSaved(true);
          console.log(data.savedPosts);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedStatus();
  }, [userInfo, _id]); // Add userInfo and _id as dependencies

  const handleBlogPage = (_id) => {
    navigate("/blog/" + _id);
  };

  const handleSavePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/saved/savedPost/${userInfo.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: _id }),
        }
      );
      if (response.ok) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleUnsavePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/saved/removePost/${userInfo.userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: _id }),
        }
      );
      if (response.ok) {
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error unsaving post:", error);
    }
  };

  return (
    <div className="h-72 shadow-lg rounded-lg my-4 pr-8 w-2/3 flex justify-evenly bg-slate-100">
      <img
        src={coverImage}
        alt="Image"
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
        <div className="w-full flex items-center justify-between">
          <button
            className="w-11/12 rounded-xl bg-black text-white font-semibold py-1 mt-8"
            onClick={() => handleBlogPage(_id)}
          >
            Read More
          </button>
          {isSaved ? (
            <button className="w-1/12" onClick={handleUnsavePost}>
              <img src={saved} alt="Unsave" className="h-8 w-8 py-1 mt-8" />
            </button>
          ) : (
            <button className="w-1/12" onClick={handleSavePost}>
              <img src={save} alt="Save" className="h-8 w-8 py-1 mt-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
