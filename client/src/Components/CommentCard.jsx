import React, { useContext, useState } from "react";
import { UserContext } from "../store/userContext";
import { toast } from "react-toastify";

const CommentCard = ({ userId, commentText, _id }) => {
  const { userInfo } = useContext(UserContext);
  const { imageURL, username } = userId;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comment/delete/` + _id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = response.json();
        console.log(data);
        setIsDeleted(true);
        toast.success("Comment deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative flex justify-start w-full gap-4 my-4 bg-white border-b-2 p-4 shadow-sm">
      <div className="flex-shrink-0">
        <img
          src={imageURL}
          alt="profile"
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center flex-grow">
        <div className="text-lg font-semibold text-gray-800">{username}</div>
        <div className="text-gray-600">{commentText}</div>
      </div>
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={toggleMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
        {isMenuOpen && (
          <div className="absolute right-0 mt-6 w-48 bg-white border rounded shadow-lg z-10">
            <ul className="py-1">
              {userId._id === userInfo.userId && (
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={async () => {
                    // Handle delete comment action here
                    setIsMenuOpen(false);
                    handleDeleteComment();
                  }}
                >
                  Delete Comment
                </li>
              )}
              <li
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Handle report comment action here
                  setIsMenuOpen(false);
                }}
              >
                Report Comment
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
