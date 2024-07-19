import { useContext, useEffect } from "react";
import { UserContext } from "../store/userContext";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";

const UserProtectedRoutes = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  const redirectToLogin = () => {
    navigate("/login");
  };
  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
          <p className="mb-6">You need to log in to use this feature.</p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  // }, []);
  return children;
};

export default UserProtectedRoutes;
