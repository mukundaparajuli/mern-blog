import { useContext } from "react";
import { UserContext } from "../store/userContext";
import logoutIcon from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileCard = ({ setShow }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logOutUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setShow(false);
        setUserInfo(null);
        toast.success("Logged out successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!userInfo) {
    return null;
  }

  const moveToAdminDashboard = () => {
    navigate("/admin");
  };

  const moveToProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="fixed right-2 h-auto bg-white border-2 border-gray-300 rounded-2xl p-4 z-10 mt-4 shadow-lg max-w-xs sm:max-w-md">
      <div>
        <div className="flex m-1 p-2 rounded-xl gap-4 items-center">
          <div>
            <img
              src={userInfo.imageURL}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover" // Decreased size
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg sm:text-xl">{userInfo.username}</h1> {/* Smaller font size */}
            <h2 className="text-sm sm:text-md text-gray-600">{userInfo.email}</h2> {/* Smaller font size */}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <button
            className="font-bold border p-1 rounded-md bg-gray-500 w-full text-white text-sm sm:text-md hover:bg-gray-800 transition duration-300"
            onClick={moveToProfilePage}
          >
            View Profile
          </button>

          <button
            className="font-bold border p-1 rounded-md bg-blue-500 w-full text-white text-sm sm:text-md hover:bg-blue-800 transition duration-300 flex items-center justify-center gap-2"
            onClick={logOutUser}
          >
            <img src={logoutIcon} alt="Log Out Icon" className="h-5 w-5" /> {/* Adjusted icon size */}
            Log Out
          </button>

          {userInfo.isAdmin && (
            <button
              className="font-bold border p-1 rounded-md bg-gray-500 w-full text-white text-sm sm:text-md hover:bg-gray-800 transition duration-300"
              onClick={moveToAdminDashboard}
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
