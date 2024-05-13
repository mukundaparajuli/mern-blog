import { useContext } from "react";
import { UserContext } from "../store/userContext";
import BlogList from "../Components/BlogList";

const AdminProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  return userInfo?.isAdmin ? children : <BlogList />;
};

export default AdminProtectedRoute;
