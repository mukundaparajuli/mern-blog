import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../store/userContext";
import BlogPost from "./BlogPost";
import useSavedBlogs from "../hooks/useSavedBlogs";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [editProfileSelected, setEditProfileSelected] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const avatarRef = useRef();

  // Get saved blogs using the custom hook
  const savedPosts = useSavedBlogs();

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
        setUserInfo({
          email: data.user.email,
          imageURL: data.user.imageURL,
          isAdmin: userInfo.isAdmin,
          success: userInfo.success,
          token: userInfo.token,
          userId: userInfo.userId,
          username: data.user.username,
        });
        console.log(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
    setEditProfileSelected(false);
  };

  return (
    <>
      <div className="flex w-[100vw] relative ">
        <div className="p-4 m-4 border-r-2 border-gray-600 min-h-[100vh] w-1/5 flex flex-col items-center gap-6 fixed">
          <img
            src={userInfo.imageURL}
            alt="Profile Image"
            className="rounded-full border-2 border-black h-32 w-32 object-cover"
          />
          {!editProfileSelected && (
            <>
              <div>
                <div className="text-start font-semibold text-4xl">
                  {userInfo.username}
                </div>
                <div className="text-start text-md italic">
                  {userInfo.email}
                </div>
                <button
                  className="mt-4 font-semibold text-md bg-gray-300 border border-black px-2 py-1 rounded-md hover:bg-gray-500"
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
          <div className="font-bold text-3xl">Saved Blogs</div>
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => <BlogPost key={post._id} {...post} />)
          ) : (
            <p>No saved posts!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
