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
  const [showPrompt, setShowPrompt] = useState(false);
  const { userInfo } = useContext(UserContext);

  const [truncatedTitle, setTruncatedTitle] = useState("");
  const [truncatedDescription, setTruncatedDescription] = useState("");

  // Function to truncate text based on screen width
  const truncateText = (text, maxChars) => {
    const sanitizedText = DOMPurify.sanitize(text);
    return sanitizedText.length > maxChars ? sanitizedText.substring(0, maxChars) + '...' : sanitizedText;
  };

  // title
  const truncateTitle = (text, maxChars) => {
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  // Function to update title and description based on screen width
  const updateTruncation = () => {
    const screenWidth = window.innerWidth;
    let titleMaxChars;
    let descriptionMaxChars;

    // Set maximum characters based on screen width
    if (screenWidth < 640) {
      titleMaxChars = 30;
      descriptionMaxChars = 100;
    } else if (screenWidth < 768) {
      titleMaxChars = 50;
      descriptionMaxChars = 150;
    } else {
      titleMaxChars = 70;
      descriptionMaxChars = 200;
    }

    // Update the truncated title and description
    setTruncatedTitle(truncateText(title, titleMaxChars));
    setTruncatedDescription(truncateTitle(blogDescription, descriptionMaxChars));
  };

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!userInfo || !_id) return;

      try {
        const response = await fetch(
          `https://techtonic-backend.onrender.com/api/saved/savedPost/${userInfo.userId}`
        );
        const data = await response.json();
        setIsSaved(data.savedPosts.includes(_id));
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedStatus();
    updateTruncation();

    // Add event listener to update on resize
    window.addEventListener("resize", updateTruncation);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateTruncation);
    };
  }, [userInfo, _id, blogDescription, title]);

  const handleBlogPage = (_id) => {
    navigate(`/blog/${_id}`);
  };

  const handleSavePost = async () => {
    if (!userInfo) {
      setShowPrompt(true);
      return;
    }

    try {
      const response = await fetch(
        `https://techtonic-backend.onrender.com/api/saved/savedPost/${userInfo.userId}`,
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
      setShowPrompt(true);
      return;
    }

    try {
      const response = await fetch(
        `https://techtonic-backend.onrender.com/api/saved/removePost/${userInfo.userId}`,
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
    setShowPrompt(false);
  };

  return (
    <div className="p-2 flex justify-evenly w-full">
      {showPrompt && (
        <PromptToLogin
          key="prompt"
          onClose={closePrompt}
          feature={"to save a blog post"}
        />
      )}
      <div className="md:h-72 h-60 shadow-lg rounded-lg my-4 pr-8 md:w-2/3 w-full flex justify-evenly bg-[#FFFAFA]">
        <img
          src={coverImage}
          alt="Image"
          className="md:h-72 h-60 w-1/2 object-cover mr-6 ml-0 rounded-l-lg cursor-pointer contain"
          onClick={() => handleBlogPage(_id)}
        />
        <div className="md:h-72 h-60 w-1/2">
          <div
            className="title-clamp md:text-3xl text-lg text-black my-2 py-2 cursor-pointer md:h-18 h-10 overflow-hidden"
            onClick={() => handleBlogPage(_id)}
          >
            {truncatedTitle}
          </div>
          <div
            className="description-clamp overflow-hidden text-justify md:h-36 h-28 text-blog-desc cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: truncatedDescription,
            }}
            onClick={() => handleBlogPage(_id)}
          ></div>
          <div className="w-full flex items-center justify-between md:h-18 h-12">
            <button
              className="md:w-11/12 w-10/12 rounded-xl bg-black text-white font-semibold py-1 mt-8"
              onClick={() => handleBlogPage(_id)}
            >
              Read More
            </button>
            {isSaved ? (
              <button className="md:w-1/12 w-2/12" onClick={handleUnsavePost}>
                <img src={saved} alt="Unsave" className="h-8 w-8 py-1 mt-8" />
              </button>
            ) : (
              <button className="md:w-1/12 w-2/12" onClick={handleSavePost}>
                <img src={save} alt="Save" className="h-8 w-8 py-1 mt-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
