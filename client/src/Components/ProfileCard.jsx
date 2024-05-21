import React, { useContext } from "react";
import { UserContext } from "../store/userContext";
import logoutIcon from "../assets/logout.png";

const ProfileCard = () => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return null; // or a loading spinner, etc.
  }

  return (
    <div className=" w-auto fixed right-2 h-auto bg-white border-2 border-gray-300 rounded-2xl p-2 z-10 mt-4 shadow-lg">
      <div>
        <div className="flex m-1 p-2 rounded-xl gap-4 items-center">
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

        <div className="flex flex-col gap-1 mt-2">
          <button className="font-bold border p-1 rounded-md bg-gray-500 w-full text-white hover:bg-gray-800 transition duration-300">
            View Profile
          </button>

          <button className="font-bold border p-1 rounded-md bg-blue-500 w-full text-white hover:bg-blue-800 transition duration-300 flex items-center justify-center gap-2">
            <img src={logoutIcon} alt="Log Out Icon" className="h-6 w-6" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
