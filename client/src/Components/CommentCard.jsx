import React from "react";

const CommentCard = ({ userId, commentText }) => {
  const { imageURL, username } = userId;

  return (
    <div className="flex w-full gap-4 my-4 bg-white border-b-2 p-4 shadow-sm">
      <div className="flex-shrink-0">
        <img
          src={imageURL}
          alt="profile"
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-lg font-semibold text-gray-800">{username}</div>
        <div className="text-gray-600">{commentText}</div>
      </div>
    </div>
  );
};

export default CommentCard;
