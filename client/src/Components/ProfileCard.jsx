import React, { useContext } from "react";
import { UserContext } from "../store/userContext";

const ProfileCard = () => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return null; // or a loading spinner, etc.
  }

  return (
    <div className="fixed right-2 w-1/4 bg-white border-4 border-gray-300 rounded-2xl p-3 z-10 mt-4 shadow-lg">
      <div className="flex justify-end mb-4"></div>
      <div className="">
        <div className="flex m-1 p-4 border-2 border-gray-200 rounded-xl shadow-lg gap-4 items-center">
          <div>
            <img
              src={userInfo.imageURL}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-2xl">{userInfo.username}</h1>
            <h2 className="text-lg text-gray-600">{userInfo.email}</h2>
          </div>
        </div>
        <button
          className="mt-6 font-bold border p-2 rounded-xl bg-blue-700 w-full text-white border-blue-700 hover:bg-blue-800 transition duration-300"
          // onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
