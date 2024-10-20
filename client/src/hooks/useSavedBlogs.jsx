import { useContext, useState, useEffect } from "react";
import { UserContext } from "../store/userContext";

const useSavedBlogs = () => {
  const userInfo = useContext(UserContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const [savedBlogUrl, setSavedBlogUrl] = useState([]);
  const [savedPost, setSavedPost] = useState([]);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/saved/savedPost/${userInfo.userInfo.userId}`
        );
        if (response.ok) {
          const data = await response.json();

          setSavedBlogUrl(data.savedPosts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blog/blogs`);
        if (response.ok) {
          const data = await response.json();

          setAllBlogs(data.blogs);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedBlogs();
    fetchAllBlogs();
  }, [userInfo.userInfo.userId]);

  useEffect(() => {
    if (allBlogs.length && savedBlogUrl.length) {
      const savedBlogs = allBlogs.filter((blog) =>
        savedBlogUrl.includes(blog._id)
      );
      setSavedPost(savedBlogs);
    }
  }, [allBlogs, savedBlogUrl]);

  return savedPost;
};

export default useSavedBlogs;
