import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/profile`, {
          credentials: "include",
          method: "GET"
        })
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.userInfo);
        }
      } catch (err) {
        console.log("Error occured while fetching the user from the backend", err);
      }
    }
    fetchUserProfile();
  }, [])

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
