import React from "react";

const UserCard = (props) => {
  const { username, email, imageURL } = props;
  return (
    <div className="h-18 flex border-r-2 border-b-2 px-4 p-2 my-4 gap-4 shadow-lg">
      <div className="h-12 ">
        <img
          src={imageURL}
          alt="Profile"
          className="rounded-full h-12 border-2 border-black"
        />
      </div>
      <div>
        <div className="font-bold text-lg">{username}</div>
        <div className="text-md italic">{email}</div>
      </div>
    </div>
  );
};

export default UserCard;
