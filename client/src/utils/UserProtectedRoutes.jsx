import { useContext, useEffect } from "react";
import { UserContext } from "../store/userContext";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const UserProtectedRoutes = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  return userInfo ? children : <Login />;
};

export default UserProtectedRoutes;
