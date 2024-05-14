import { useContext } from "react";
import { UserContext } from "../store/userContext";
import Login from "../Components/Login";

const UserProtectedRoutes = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  return userInfo ? children : <Login />;
};

export default UserProtectedRoutes;
