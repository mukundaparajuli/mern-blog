import { useContext, useEffect } from "react";
import { UserContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";
import BlogList from "../Components/BlogList";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    if (!userInfo?.userInfo?.isAdmin) {
      navigate("/");
    }
  }, []);
  return userInfo?.userInfo?.isAdmin ? children : <BlogList />;
};

export default AdminProtectedRoute;
