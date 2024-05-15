import JoditEditor from "jodit-react";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../store/userContext";

const TextEditor = () => {
  const { userInfo } = useContext(UserContext);
  const editor = useRef(null);
  const [blogDescription, setBlogDescription] = useState("");
  const [title, setTitle] = useState("");
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/blog/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          blogDescription: blogDescription,
          author: userInfo?.username,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full">
      <form
        className="p-2 w-full gap-4 border-2 my-4 rounded-md"
        onSubmit={handleCreatePost}
      >
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full my-2 p-2 border"
          />
        </div>
        <div>
          <JoditEditor
            ref={editor}
            value={blogDescription}
            onChange={(newContent) => setBlogDescription(newContent)}
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="sr-only">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="w-full border p-2 my-2 "
            placeholder="Select an Image as Cover Image"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default TextEditor;
