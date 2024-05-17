import React, { useEffect, useState } from "react";

const CommentCard = ({ userId, commentText }) => {
  const { imageURL, username } = userId;
  const [isUsersComment, setIsUsersComment] = useState(false);

  useEffect(() => {});
  return (
    <div className="flex justify-start w-full gap-4 my-4 bg-white border-b-2 p-4 shadow-sm">
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
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default CommentCard;
