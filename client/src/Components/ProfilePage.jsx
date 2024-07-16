import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../store/userContext";
import Header from "./Header";
import BlogPost from "../components/BlogPost";

const ProfilePage = () => {
  const { userInfo } = useContext(UserContext);
  const [editProfileSelected, setEditProfileSelected] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [savedPosts, setSavedPosts] = useState([]);
  const avatarRef = useRef();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      const file = avatarRef.current.files[0];

      const formData = new FormData();
      if (!file) {
        formData.append("avatar", null);
      }
      formData.append("avatar", file);
      formData.append("username", username);
      formData.append("email", email);
      const response = await fetch(
        "http://localhost:5000/api/user/updateprofile/" + userInfo.userId,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    setEditProfileSelected(false);
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/saved/savedPost/${userInfo.userId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSavedPosts(data.savedPosts);
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <>
      <div className="flex w-[100vw] relative">
        <div className="p-4 m-4 border-r-2 border-gray-600 min-h-[100vh] w-1/5 flex flex-col items-center gap-6 fixed">
          <img
            src={userInfo.imageURL}
            alt="Profile Image"
            className="rounded-full border-2 border-black h-32 w-32"
          />
          {!editProfileSelected && (
            <>
              <div>
                <div className="text-start font-bold text-4xl">
                  {userInfo.username}
                </div>
                <div className="text-start text-xl">{userInfo.email}</div>
                <button
                  className="mt-4 font-semibold text-lg bg-gray-300 border border-black px-2 py-1 rounded-md hover:bg-gray-500"
                  onClick={() => setEditProfileSelected(true)}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
          {editProfileSelected && (
            <div>
              <div>
                <label
                  htmlFor="uploadAvatar"
                  className="text-green-600 underline"
                >
                  Upload New Avatar
                </label>
                <input
                  type="file"
                  name="uploadAvatar"
                  id="uploadAvatar"
                  className="hidden"
                  ref={avatarRef}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label htmlFor="username" className="font-semibold text-lg">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="py-1 px-2 border border-black rounded-md"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold text-lg">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="py-1 px-2 border border-black rounded-md"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                <button
                  className="mt-4 font-semibold text-lg bg-gray-300 border border-black px-2 py-1 rounded-md hover:bg-gray-500"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-4/5 relative left-1 ml-[20%] p-4 flex flex-col items-center">
          <div className="font-bold text-3xl">Saved Blogs:</div>
          {savedPosts.length > 1 &&
            savedPosts.map((post) => <BlogPost key={post._id} {...post} />)}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
