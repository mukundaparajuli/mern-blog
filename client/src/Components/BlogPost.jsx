import DOMPurify from "dompurify";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import save from "../assets/save.png";
import saved from "../assets/saved.png";
import { UserContext } from "../store/userContext";
import PromptToLogin from "./PromptToLogin";
import { toast } from "react-toastify";

const BlogPost = ({ title, blogDescription, coverImage, _id }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false); // State for managing prompt visibility
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!userInfo || !_id) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/saved/savedPost/${userInfo.userId}`
        );
        const data = await response.json();
        setIsSaved(data.savedPosts.includes(_id));
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedStatus();
  }, [userInfo, _id]);

  const handleBlogPage = (_id) => {
    navigate(`/blog/${_id}`);
  };

  const handleSavePost = async () => {
    if (!userInfo) {
      setShowPrompt(true); // Show prompt if user is not logged in
      return;
    }

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
        toast.success("Saved Post Successfully");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleUnsavePost = async () => {
    if (!userInfo) {
      setShowPrompt(true); // Show prompt if user is not logged in
      return;
    }

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

  const closePrompt = () => {
    setShowPrompt(false); // Close the prompt
  };

  return (
    <>
      {showPrompt && (
        <PromptToLogin
          key="prompt"
          onClose={closePrompt}
          feature={"to save a blog post"}
        />
      )}
      <div className="h-72 shadow-lg rounded-lg my-4 pr-8 w-2/3 flex justify-evenly bg-[#FFFAFA]">
        <img
          src={coverImage}
          alt="Image"
          className="h-72 w-1/2 content object-cover mr-6 ml-0 rounded-l-lg cursor-pointer"
          onClick={() => handleBlogPage(_id)}
        />
        <div className="h-72 w-1/2">
          <div
            className="font-bold text-3xl text-black my-2 py-2 cursor-pointer"
            onClick={() => handleBlogPage(_id)}
          >
            {title}
          </div>
          <div
            className="overflow-hidden text-justify h-36 text-blog-desc cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogDescription),
            }}
            onClick={() => handleBlogPage(_id)}
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
    </>
  );
};

export default BlogPost;
