import { useContext, useEffect } from "react";
import { UserContext } from "../store/userContext";
import BlogList from "../Components/BlogList";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }, []);

  return userInfo?.isAdmin ? children : <BlogList />;
};

export default AdminProtectedRoute;
