import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users`, {
        method: "GET",
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
      {users &&
        users.map((user) => (
          <li key={user._id} className="bg-gradient-to-b ">
            {user.username}
          </li>
        ))}
    </ul>
  );
};

export default Users;
