import { useContext, useState } from "react";
import { UserContext } from "../store/userContext";

const AddComment = ({ blogId }) => {
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const addComment = async () => {
    if (!userInfo.userId) return;
    try {
      const response = await fetch(
        "http://localhost:5000/api/comment/addComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentText: comment,
            userId: userInfo.userId,
            blogId: blogId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="gap-2 flex">
      <input
        type="text"
        name="commentText"
        id="commentText"
        placeholder="Comment here!"
        className="p-2 w-4/5 rounded-lg"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="rounded-lg p-2 w-1/5 bg-black text-white"
        onClick={() => addComment()}
      >
        Comment
      </button>
    </div>
  );
};

export default AddComment;
