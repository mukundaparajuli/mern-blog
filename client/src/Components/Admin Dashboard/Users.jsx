import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://techtonic-backend.onrender.com/api/admin/users`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      }
    } catch (err) {
      console.log("Error occured while fetching the users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ul className="p-4 list-none w-full b">
      {users && users.map((user) => <UserCard key={user._id} {...user} />)}
    </ul>
  );
};

export default Users;
